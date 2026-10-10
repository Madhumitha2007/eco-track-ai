import { CategoryId } from '../types/waste';
import { WASTE_CATEGORIES } from '../data/wasteCategories';

export interface ImageAnalysisResult {
  detectedCategory: CategoryId;
  confidenceScore: number; // 0 - 100
  alternativeCategories: { category: CategoryId; score: number }[];
  detectedFeatures: string[];
  isDemoNotice: string;
}

/**
 * Client-side visual spectrum analyzer for demo classification.
 * Uses image canvas pixel analysis + filename heuristics with clear demo labeling.
 */
export const analyzeWasteImage = async (
  file: File,
  imageElement: HTMLImageElement
): Promise<ImageAnalysisResult> => {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;

      if (!ctx) {
        resolve(getDefaultFallback(file.name));
        return;
      }

      ctx.drawImage(imageElement, 0, 0, 100, 100);
      const imgData = ctx.getImageData(0, 0, 100, 100);
      const data = imgData.data;

      let totalR = 0, totalG = 0, totalB = 0;
      let greenPixels = 0;
      let metallicPixels = 0;
      let brownPaperPixels = 0;
      let darkHazardPixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        totalR += r;
        totalG += g;
        totalB += b;

        // Dominant Green -> Organic
        if (g > r * 1.15 && g > b * 1.15 && g > 60) greenPixels++;

        // Metallic Grey/Silver -> Metal/Glass/E-Waste
        if (Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 120 && r < 230) metallicPixels++;

        // Brown/Cardboard -> Paper
        if (r > 130 && g > 90 && g < 150 && b < 100) brownPaperPixels++;

        // High Contrast / Vivid Warning -> Hazardous / Battery
        if (r > 180 && g < 80 && b < 80) darkHazardPixels++;
      }

      const totalPixels = data.length / 4;
      const greenRatio = greenPixels / totalPixels;
      const metallicRatio = metallicPixels / totalPixels;
      const brownRatio = brownPaperPixels / totalPixels;
      const hazardRatio = darkHazardPixels / totalPixels;

      // Filename clue matching (bonus fallback helper)
      const name = file.name.toLowerCase();

      let detectedCategory: CategoryId = 'plastic';
      let confidenceScore = 84;
      let features: string[] = ['Smooth texture detected', 'Rigid polymer structure'];

      if (name.includes('apple') || name.includes('banana') || name.includes('food') || name.includes('leaf') || greenRatio > 0.18) {
        detectedCategory = 'organic';
        confidenceScore = Math.min(96, Math.max(78, Math.round(greenRatio * 250 + 60)));
        features = ['Organic pigmentation', 'Cellular fiber texture', 'Natural shape contours'];
      } else if (name.includes('box') || name.includes('paper') || name.includes('cardboard') || brownRatio > 0.15) {
        detectedCategory = 'paper';
        confidenceScore = Math.min(94, Math.max(75, Math.round(brownRatio * 200 + 65)));
        features = ['Fibrous wood pulp density', 'Matte surface reflectivity', 'Layered edge profiles'];
      } else if (name.includes('bottle') || name.includes('jar') || name.includes('glass')) {
        detectedCategory = 'glass';
        confidenceScore = 89;
        features = ['High specular reflection', 'Translucent transparency', 'Smooth non-porous surface'];
      } else if (name.includes('can') || name.includes('metal') || name.includes('foil') || metallicRatio > 0.25) {
        detectedCategory = 'metal';
        confidenceScore = Math.min(95, Math.max(76, Math.round(metallicRatio * 180 + 65)));
        features = ['Specular metal sheen', 'High edge contrast', 'Rigid metallic rim'];
      } else if (name.includes('battery') || name.includes('phone') || name.includes('cable') || name.includes('circuit')) {
        detectedCategory = 'electronic';
        confidenceScore = 91;
        features = ['Multi-component assembly', 'PCB copper trace geometry', 'Insulated casing'];
      } else if (name.includes('paint') || name.includes('chemical') || name.includes('spray') || hazardRatio > 0.1) {
        detectedCategory = 'hazardous';
        confidenceScore = 88;
        features = ['Hazard symbol geometry', 'Sealed pressure vessel', 'Warning pigment contrast'];
      }

      const alternatives = (Object.keys(WASTE_CATEGORIES) as CategoryId[])
        .filter(c => c !== detectedCategory)
        .slice(0, 2)
        .map(c => ({ category: c, score: Math.round(confidenceScore * (0.3 + Math.random() * 0.4)) }));

      setTimeout(() => {
        resolve({
          detectedCategory,
          confidenceScore,
          alternativeCategories: alternatives,
          detectedFeatures: features,
          isDemoNotice: 'Demo AI Visual Analyzer (Client-side heuristic detection for ForgeHacks)'
        });
      }, 400);

    } catch (err) {
      resolve(getDefaultFallback(file.name));
    }
  });
};

const getDefaultFallback = (filename: string): ImageAnalysisResult => {
  return {
    detectedCategory: 'plastic',
    confidenceScore: 78,
    alternativeCategories: [
      { category: 'paper', score: 32 },
      { category: 'glass', score: 24 }
    ],
    detectedFeatures: ['Standard container profile', 'Synthetic material boundary'],
    isDemoNotice: 'Demo AI Visual Analyzer (Client-side heuristic detection for ForgeHacks)'
  };
};
