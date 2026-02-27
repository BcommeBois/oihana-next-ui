/**
 * PatternCraft Plugin for Tailwind CSS v4
 *
 * Génère des utilities pour créer des backgrounds basés sur https://patterncraft.fun/
 *
 * @module pattern-craft-plugin
 * @author Marc
 * @version 1.0.0
 *
 * @example
 * // Dans tailwind.config.js
 * import patternCraft from './pattern-craft-plugin.js';
 *
 * export default {
 *   plugins: [
 *     patternCraft({
 *       prefix: 'pc', // Optionnel, par défaut 'pattern'
 *       respectMotionPreference: true, // Désactive les animations si prefers-reduced-motion
 *     })
 *   ]
 * }
 *
 * @example
 * // Usage en HTML
 * <div class="pattern-aurora-waves">
 * <div class="pattern-grid-fade-top hover:pattern-grid-purple">
 * <div class="dark:pattern-midnight-glow">
 */

import plugin from 'tailwindcss/plugin';

/**
 * Configuration du plugin
 * @typedef {Object} PatternCraftOptions
 * @property {string} [prefix='pattern'] - Préfixe pour les classes générées
 * @property {boolean} [respectMotionPreference=true] - Respecter prefers-reduced-motion
 */

/**
 * Patterns organisés par catégories
 */
const patterns =
{
  // ============================================================================
  // GRADIENTS RADIAUX
  // ============================================================================
  radialGradients: {
    'radial-glow-dark': {
      background: 'radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-blue': {
      background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-purple': {
      background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-cyan': {
      background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-orange': {
      background: 'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-pink': {
      background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-gold': {
      background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-red': {
      background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-lime': {
      background: 'radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'radial-glow-emerald': {
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
  },

  // ============================================================================
  // AURORA & DREAMY GRADIENTS
  // ============================================================================
  auroraGradients: {
    'aurora-waves': {
      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(16, 185, 129, 0.2) 100%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'aurora-dream-corner': {
      background: 'radial-gradient(ellipse at top left, rgba(147, 51, 234, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'aurora-dream-soft': {
      background: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'aurora-dream-diagonal': {
      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'aurora-dream-vivid': {
      background: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.25) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 100%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'dreamy-sky-pink': {
      background: 'linear-gradient(to bottom, rgba(251, 207, 232, 0.3) 0%, rgba(165, 180, 252, 0.3) 100%)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'peachy-mint-dream': {
      background: 'linear-gradient(135deg, rgba(254, 215, 170, 0.4) 0%, rgba(167, 243, 208, 0.4) 100%)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'soft-pastel-dream': {
      background: 'linear-gradient(to right, rgba(252, 231, 243, 0.5) 0%, rgba(224, 242, 254, 0.5) 100%)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'cotton-candy-sky': {
      background: 'linear-gradient(to bottom, rgba(251, 207, 232, 0.4) 0%, rgba(224, 242, 254, 0.4) 100%)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
  },

  // ============================================================================
  // GRILLES & PATTERNS GÉOMÉTRIQUES
  // ============================================================================
  gridPatterns: {
    'grid-basic': {
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-dark-basic': {
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      backgroundColor: 'rgb(0, 0, 0)',
    },
    'grid-white': {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'grid-fade-top': {
      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 1) 0%, transparent 100%), linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      backgroundSize: '100% 100%, 50px 50px, 50px 50px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-fade-bottom': {
      background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 100%), linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      backgroundSize: '100% 100%, 50px 50px, 50px 50px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-dotted-dark': {
      backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-dotted-white': {
      backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      backgroundColor: 'rgb(0, 0, 0)',
    },
    'grid-small': {
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-dots-white': {
      backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      backgroundColor: 'rgb(0, 0, 0)',
    },
    'grid-dots-dark': {
      backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-diagonal': {
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.05) 35px, rgba(255, 255, 255, 0.05) 70px)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'grid-diagonal-light': {
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0, 0, 0, 0.03) 35px, rgba(0, 0, 0, 0.03) 70px)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
  },

  // ============================================================================
  // PATTERNS AVEC GLOW & SPOTLIGHTS
  // ============================================================================
  glowPatterns: {
    'glow-top-teal': {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-bottom-teal': {
      background: 'radial-gradient(ellipse at 50% 100%, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-top-pink': {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-bottom-pink': {
      background: 'radial-gradient(ellipse at 50% 100%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-top-amber': {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-bottom-amber': {
      background: 'radial-gradient(ellipse at 50% 100%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-top-emerald': {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'glow-bottom-emerald': {
      background: 'radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'spotlight-center': {
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(15, 23, 42, 1) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'spotlight-top': {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.15) 0%, rgba(15, 23, 42, 1) 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'spotlight-white': {
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(15, 23, 42, 1) 60%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'spotlight-blue': {
      background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(15, 23, 42, 1) 60%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'spotlight-emerald': {
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, rgba(15, 23, 42, 1) 60%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'spotlight-crimson': {
      background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.3) 0%, rgba(15, 23, 42, 1) 60%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
  },

  // ============================================================================
  // PATTERNS SPÉCIAUX & EFFETS
  // ============================================================================
  specialEffects: {
    'circuit-board': {
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'circuit-board-light': {
      backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'matrix-green': {
      backgroundImage: `
        linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
      `,
      backgroundSize: '30px 30px, 30px 30px, 100% 100%, 100% 100%',
      backgroundColor: 'rgb(0, 0, 0)',
    },
    'paper-texture': {
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.02) 2px, rgba(0, 0, 0, 0.02) 3px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.02) 2px, rgba(0, 0, 0, 0.02) 3px)
      `,
      backgroundColor: 'rgb(254, 252, 247)',
    },
    'diagonal-stripes': {
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.05) 10px, rgba(0, 0, 0, 0.05) 20px)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'diagonal-stripes-dark': {
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.03) 10px, rgba(255, 255, 255, 0.03) 20px)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'noise-texture': {
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 60% 30%, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '3px 3px, 5px 5px, 7px 7px',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'cosmic-noise': {
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
        radial-gradient(circle at 60% 30%, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '5px 5px, 7px 7px, 9px 9px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'hexagonal-lines': {
      backgroundImage: `
        linear-gradient(30deg, rgba(255, 255, 255, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.05) 87.5%, rgba(255, 255, 255, 0.05)),
        linear-gradient(150deg, rgba(255, 255, 255, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.05) 87.5%, rgba(255, 255, 255, 0.05)),
        linear-gradient(30deg, rgba(255, 255, 255, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.05) 87.5%, rgba(255, 255, 255, 0.05)),
        linear-gradient(150deg, rgba(255, 255, 255, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.05) 87.5%, rgba(255, 255, 255, 0.05))
      `,
      backgroundSize: '80px 140px',
      backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
  },

  // ============================================================================
  // CORNER GLOWS & DEPTH EFFECTS
  // ============================================================================
  cornerGlows: {
    'purple-corner-glow': {
      background: 'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'blue-corner-glow': {
      background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'green-corner-soft': {
      background: 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'pink-corner-dream': {
      background: 'radial-gradient(ellipse at top left, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'orange-corner-warm': {
      background: 'radial-gradient(ellipse at top left, rgba(251, 146, 60, 0.2) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'teal-corner-cool': {
      background: 'radial-gradient(ellipse at top left, rgba(20, 184, 166, 0.2) 0%, transparent 50%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'crimson-depth': {
      background: 'radial-gradient(ellipse at bottom, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'emerald-void': {
      background: 'radial-gradient(ellipse at bottom, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'violet-abyss': {
      background: 'radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'azure-depths': {
      background: 'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
      backgroundColor: 'rgb(15, 23, 42)',
    },
  },

  // ============================================================================
  // MIDNIGHT & COSMIC EFFECTS
  // ============================================================================
  cosmicEffects: {
    'midnight-aurora': {
      background: `
        radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 60%)
      `,
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'cosmic-aurora': {
      background: `
        radial-gradient(ellipse at 20% 30%, rgba(147, 51, 234, 0.2) 0%, transparent 40%),
        radial-gradient(ellipse at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
      `,
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'midnight-ember': {
      background: `
        radial-gradient(ellipse at 50% 100%, rgba(239, 68, 68, 0.2) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 0%, rgba(251, 146, 60, 0.15) 0%, transparent 60%)
      `,
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'deep-ocean': {
      background: `
        radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.2) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 100%, rgba(14, 165, 233, 0.15) 0%, transparent 60%)
      `,
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'volcanic-ember': {
      background: `
        radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.25) 0%, transparent 40%),
        radial-gradient(circle at 70% 60%, rgba(251, 146, 60, 0.2) 0%, transparent 40%)
      `,
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'northern-aurora': {
      background: `
        linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(147, 51, 234, 0.15) 100%)
      `,
      backgroundColor: 'rgb(15, 23, 42)',
    },
    'cosmic-sparkle': {
      background: `
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px, 80px 80px, 100px 100px',
      backgroundColor: 'rgb(15, 23, 42)',
    },
  },
};

export default plugin( ( { addUtilities, addVariant } ) =>
{
    const prefix = 'pattern';
    const utilities = {};

    Object.entries(patterns).forEach(([category, categoryPatterns]) => {
        Object.entries(categoryPatterns).forEach(([name, styles]) => {
            const className = `.${prefix}-${name}`;

            utilities[className] = {
                ...styles,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'scroll', // Scroll par défaut
            };
        });
    });

    addUtilities( utilities ) ;

    addUtilities({
        [`.${prefix}-fixed`]: {
            backgroundAttachment: 'fixed !important',
        },
        [`.${prefix}-scroll`]: {
            backgroundAttachment: 'scroll !important',
        },
        [`.${prefix}-local`]: {
            backgroundAttachment: 'local !important',
        },
    });

    addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
    addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
});