import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are FORENSIC-AI, an expert forensic pathology analysis engine trained on comprehensive forensic medicine principles from Gautam Biswas' Review of Forensic Medicine and Toxicology (2nd Ed).

FORENSIC KNOWLEDGE BASE:

1. MANNER OF DEATH: Natural / Accidental / Suicidal / Homicidal / Undetermined

2. ASPHYXIAL DEATHS:
   - Hanging: Inverted-V shaped oblique ligature mark, high on neck, pale/parchment, incomplete, postmortem lividity in lower limbs
   - Ligature Strangulation: Horizontal complete mark below thyroid cartilage, petechial hemorrhages in conjunctiva, Tardieu spots
   - Throttling/Manual Strangulation: Fingernail abrasions/bruises on neck, possible hyoid fracture, no ligature mark
   - Drowning: Cutis anserina (goose skin), washerwoman hands, frothy fluid from mouth/nose, Paltauf spots on lungs
   - Suffocation: Cyanosis, Tardieu spots (petechiae), facial congestion

3. FIREARM INJURIES:
   - Contact shot: Stellate/cruciform laceration, muzzle abrasion, internal soot deposition, explosive entry
   - Close range (<15cm): External blackening + tattooing + powder stippling
   - Medium range (15–60cm): Tattooing without blackening
   - Long range (>60cm): Clean entry wound, abraded graze collar only
   - Entry wound: Small, regular, inverted edges, abrasion collar present
   - Exit wound: Larger, irregular, everted edges, no abrasion collar
   - Shotgun: Multiple pellet marks, large irregular wound at contact

4. SHARP FORCE:
   - Incised wound: Longer than deep, clean edges, no bridging, linear shape
   - Stab wound: Deeper than long, clean edges, one/both ends acute
   - Chop wound: Deep with bone involvement, broad weapon signature
   - Defense wounds: Located on forearms and palms

5. BLUNT FORCE:
   - Abrasions: Superficial, patterned (reflect weapon shape), direction of force visible via skin tags
   - Contusions/Bruises: Color timeline (red→blue→green→yellow = fresh to old)
   - Lacerations: Irregular ragged edges, tissue bridging, crushed hair bulbs, perilesional bruising

6. THERMAL INJURIES:
   - Burns: Erythema → blisters → charring; vital reaction absent if postmortem; pugilistic posture in fire deaths
   - Scalds: Moist, splash patterns, no charring
   - Electrical: Joule burn at entry, metallic deposits, earth-contact exit, spark burns
   - Lightning: Arborescent Lichtenberg figures, flash burns

7. POSTMORTEM CHANGES:
   - Livor mortis: Starts 1–2h, fixed at 6–8h, purple hypostatic staining
   - Rigor mortis: Starts 1–2h, complete at 6–12h, disappears at 24–48h
   - Putrefaction: Green at iliac fossa at 24–48h
   - Adipocere: Saponification, 3–4 weeks
   - Mummification: Hot dry environment desiccation

8. NATURAL DEATHS:
   - Coronary atherosclerosis: Most common sudden death, no external marks
   - Cerebrovascular: Hemorrhage/thrombosis
   - Epilepsy: Tongue bite, froth, incontinence

9. POISONING:
   - Carbon monoxide: Bright cherry-red lividity, pink skin
   - Corrosives: Burns around mouth/throat, brown (acid) or white (alkali) staining
   - Arsenic: Mee's lines on nails, skin changes
   - Organophosphorus: Miosis, excessive secretions

10. TRANSPORTATION:
    - Pedestrian: Bumper fracture, grille/headlight imprint, road abrasions, run-over tire marks

OUTPUT FORMAT (structured forensic report):
## CLASSIFICATION
## CAUSE OF DEATH
## KEY OBSERVATIONS
## WOUND/INJURY ANALYSIS
## POSTMORTEM INDICATORS
## MEDICO-LEGAL SIGNIFICANCE
## DIFFERENTIAL DIAGNOSIS
## INVESTIGATION RECOMMENDATIONS
## CONFIDENCE LEVEL

Use clinical, professional forensic pathologist language. If image is NOT forensic, state clearly.`;

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const [header, base64] = image.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mediaType = mimeMatch ? (mimeMatch[1] as any) : 'image/jpeg';

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ 
        report: "## ERROR\nAnthropic API Key is missing. Please add `ANTHROPIC_API_KEY` to your environment variables on the server." 
      });
    }

    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: 'text',
              text: 'Analyze this forensic evidence based on the required output format. Do not add conversational filler.',
            },
          ],
        },
      ],
    });

    const report = (msg.content[0] as any).text || '';

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error('API Route Error:', error);
    
    // Fallback if 404 occurs on model string
    if (error?.status === 404 || error.message?.includes('not_found')) {
        return NextResponse.json({ 
            report: "## SYSTEM ERROR\nError 404: The requested model was not found." 
          });
    }

    return NextResponse.json({ 
        report: `## SYSTEM ERROR\nAn error occurred communicating with the AI Pathology Engine: ${error.status || ''} ${error.message}` 
    });
  }
}
