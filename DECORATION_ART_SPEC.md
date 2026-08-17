# HQ — Decoration Art Spec (paint your own Discord-tier orbs)

The app now renders raster decorations: a transparent PNG ring that sits around your avatar,
animated live (float / spin / pulse) with sparkle particles. Upload in Profile → Custom art → Add art.

## Canvas rules (non-negotiable for a clean fit)
- Square, 512×512 (or 1024×1024), TRANSPARENT background, PNG.
- Composition is a RING: keep the centre EMPTY. Nothing inside a 300px-diameter circle in the middle
  (the avatar goes there). Art lives in the outer band, ~105px wide.
- Bias mass to the top and/or bottom, keep sides lighter — reads better on a circular avatar.
- No square borders, no drop shadow baked in (the app adds it), no text.

## Prompt template (works well in ChatGPT/Midjourney/etc.)
"Avatar decoration ring on a fully transparent background, square 1024x1024, EMPTY centre
(nothing inside a 600px circle), decorative elements only in the outer band, [DESCRIPTION],
painterly digital illustration, high detail, soft rim lighting, subtle glow, cohesive palette of
[COLOURS], centred composition, no text, no border, isolated PNG with alpha."

## Ten prompts matched to your unlock ladder
1. Scouter Orbit — "a sleek golden HUD ring with fine tick marks and one bright orbiting lens node,
   sci-fi scouter aesthetic" · colours: brass gold, deep green-black
2. Halo — "a floating luminous gold halo tilted above the top edge, three tiny sparkling stars,
   angelic but modern" · gold, ivory
3. Fallen Wings — "two dark feathered wings unfurling from the left and right sides, layered
   feathers, charcoal with steel highlights" · graphite, silver
4. Dragon Orbit — "four glossy orange dragon balls with red stars orbiting on a faint circular
   trail, anime shading" · orange, red, gold
5. Golden Aura — "raging golden flame aura licking upward from the top edge, ember particles,
   Super Saiyan energy" · gold, white-hot core
6. The Crown — "an ornate jewelled crown resting on the top edge, ruby centre, sapphire and emerald
   sides, pearls on the band" · gold, jewel tones
7. Ultra Flame — "cool silver-white spirit flames circling the ring, calm mastered energy,
   faint blue tips" · silver, ice blue
8. Red Shift — "glitched crimson arcs with cyan chromatic split, digital corruption shards,
   cyber aesthetic" · crimson, cyan
9. Fairway Laurel — "laurel of glossy green leaves wrapping the bottom half, a dimpled white
   golf ball resting at the base" · greens, ivory
10. Violet — "royal purple nebula wisps and tiny stars circling" · purple, magenta

## Export
- Export PNG with alpha. Keep under ~400 KB (the app resizes to 512 and will refuse if huge).
- Upload → pick motion (still / float / spin / pulse) on the card. Syncs to all devices.
