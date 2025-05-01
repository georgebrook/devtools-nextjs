import svgSprite from 'svg-sprite';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const iconsDir = 'assets/icons';
const outputPath = 'public/icons-sprite.svg';

const config = {
  mode: {
    symbol: {
      sprite: 'icons-sprite.svg',
    },
  },
};

function buildSprite() {
  const spriter = new svgSprite(config);

  readdirSync(iconsDir).forEach((file) => {
    if (file.endsWith('.svg')) {
      const filePath = join(iconsDir, file);
      spriter.add(filePath, null, readFileSync(filePath, 'utf-8'));
    }
  });

  spriter.compile((error, result) => {
    if (error) {
      console.error('❌ Error compiling sprite:', error);
      return;
    }

    const spriteContent = result.symbol.sprite.contents.toString();
    writeFileSync(outputPath, spriteContent);
    console.log('✅ SVG sprite generated at:', outputPath);
  });
}

buildSprite();
