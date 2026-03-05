/**
 * PREMIUM THEMES - Exemplos de Temas Customizados para Monetização
 * 
 * Este arquivo mostra 5 temas diferentes prontos para vendê-los
 * como premium features no seu web app de fichas.
 * 
 * Cada tema pode ser vendido individualmente a $2.99-9.99 ou
 * como bundle por $29.99/ano (modelo subscription)
 */

import type { SheetConfig } from '../types/sheetTypes';
import { XCOM_COMPLETE_TEMPLATE } from './xcomTemplates';

// ============================================================================
// TEMA 1: CYBERPUNK 2077
// ============================================================================
// Cores: Neon pink/magenta, ciano, preto profundo
// Vibe: Futurista, distópico, high-tech

export const CYBERPUNK_THEME = {
  primaryColor: '#FF10F0',      // Neon Pink/Magenta
  secondaryColor: '#00FFFF',    // Ciano Neon
  backgroundColor: '#0d0221',   // Quase preto
  fontFamily: "'Roboto Mono', 'Courier New', monospace",
  accentColor: '#FF006E',       // Rosa forte
};

export function createCyberpunkSheet(baseTemplate = XCOM_COMPLETE_TEMPLATE): SheetConfig {
  const modified = JSON.parse(JSON.stringify(baseTemplate));
  modified.name = 'Cyberpunk 2077 Character Sheet';
  modified.description = 'Ficha editável com tema Cyberpunk 2077 - distópico e futurista';
  return modified;
}

// ============================================================================
// TEMA 2: FANTASY MEDIEVAL
// ============================================================================
// Cores: Ouro, vermelho escuro, marrom, verde floresta
// Vibe: Medieval, fantasia, antigo

export const FANTASY_THEME = {
  primaryColor: '#D4AF37',       // Ouro
  secondaryColor: '#8B0000',     // Vermelho Escuro (Maroon)
  backgroundColor: '#1a0f0a',    // Marrom muito escuro
  fontFamily: "'Serif', 'Georgia', serif",
  accentColor: '#228B22',        // Verde Floresta
};

export function createFantasySheet(baseTemplate = XCOM_COMPLETE_TEMPLATE): SheetConfig {
  const modified = JSON.parse(JSON.stringify(baseTemplate));
  modified.name = 'Medieval Fantasy Character Sheet';
  modified.description = 'Ficha editável com tema Medieval Fantasy - épico e imponente';
  return modified;
}

// ============================================================================
// TEMA 3: SCI-FI MATRIX (The Matrix)
// ============================================================================
// Cores: Verde escuro, preto, verde limão (matrix)
// Vibe: Hacker, Matrix, código

export const MATRIX_THEME = {
  primaryColor: '#00FF41',       // Verde Matriz
  secondaryColor: '#39FF14',     // Verde Limão Neon
  backgroundColor: '#0a0e27',    // Preto com azul
  fontFamily: "'Courier New', 'Courier', monospace",
  accentColor: '#FF0080',        // Pink para contraste
};

export function createMatrixSheet(baseTemplate = XCOM_COMPLETE_TEMPLATE): SheetConfig {
  const modified = JSON.parse(JSON.stringify(baseTemplate));
  modified.name = 'Matrix Hacker Sheet';
  modified.description = 'Ficha editável com tema The Matrix - Código verde, realidade virtual';
  return modified;
}

// ============================================================================
// TEMA 4: STEAMPUNK
// ============================================================================
// Cores: Bronze/Cobre, Marrom, Ouro, Preto
// Vibe: Vitoriano, engrenagens, vapor, retro-futurista

export const STEAMPUNK_THEME = {
  primaryColor: '#CD853F',       // Peru (Bronze/Cobre)
  secondaryColor: '#B8860B',     // Dark Goldenrod
  backgroundColor: '#2a2520',    // Marrom muito escuro
  fontFamily: "'Inconsolata', 'Monospace', serif",
  accentColor: '#FFD700',        // Ouro
};

export function createSteampunkSheet(baseTemplate = XCOM_COMPLETE_TEMPLATE): SheetConfig {
  const modified = JSON.parse(JSON.stringify(baseTemplate));
  modified.name = 'Steampunk Adventurer Sheet';
  modified.description =
    'Ficha editável com tema Steampunk - vapor, engrenagens e invenções';
  return modified;
}

// ============================================================================
// TEMA 5: ELDRITCH HORROR (Cosmic Horror)
// ============================================================================
// Cores: Roxo escuro, azul escuro, verde doente
// Vibe: Assustador, cósmico, indescritível

export const ELDRITCH_THEME = {
  primaryColor: '#9D00FF',       // Roxo Místico
  secondaryColor: '#00FFFF',     // Ciano gelado
  backgroundColor: '#0a0015',    // Quase preto com roxo
  fontFamily: "'Courier New', monospace",
  accentColor: '#FF00FF',        // Magenta para psicodelia
};

export function createEldritchSheet(baseTemplate = XCOM_COMPLETE_TEMPLATE): SheetConfig {
  const modified = JSON.parse(JSON.stringify(baseTemplate));
  modified.name = 'Cosmic Horror Sheet';
  modified.description = 'Ficha editável com tema Lovecraftiano - horror cósmico e sanidade';
  return modified;
}

// ============================================================================
// GERENCIADOR DE TEMAS PREMIUM
// ============================================================================

export interface PremiumThemeMeta {
  id: string;
  name: string;
  displayName: string;
  description: string;
  price: number;
  category: 'sci-fi' | 'fantasy' | 'horror' | 'steampunk';
  colors: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    accentColor: string;
  };
  creator: (baseTemplate?: SheetConfig) => SheetConfig;
  releaseDate: string;
  compatibility: string[]; // versões com as quais é compatível
}

export const PREMIUM_THEMES_CATALOG: Record<string, PremiumThemeMeta> = {
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    displayName: '🌃 Cyberpunk 2077',
    description:
      'Tema futurista e distópico com neons vibrantes. Perfeito para campanhas high-tech.',
    price: 4.99,
    category: 'sci-fi',
    colors: CYBERPUNK_THEME,
    creator: createCyberpunkSheet,
    releaseDate: '2024-01-01',
    compatibility: ['1.0.0', '2.0.0'],
  },
  fantasy: {
    id: 'fantasy',
    name: 'Medieval Fantasy',
    displayName: '⚔️ Medieval Fantasy',
    description:
      'Tema épico e fantástico com cores quentes. Ideal para D&D e campanhas medievais.',
    price: 4.99,
    category: 'fantasy',
    colors: FANTASY_THEME,
    creator: createFantasySheet,
    releaseDate: '2024-01-15',
    compatibility: ['1.0.0', '2.0.0'],
  },
  matrix: {
    id: 'matrix',
    name: 'The Matrix',
    displayName: '💚 The Matrix',
    description:
      'Tema hacker com código verde clássico. Para campanha cyberpunk/hacker.',
    price: 4.99,
    category: 'sci-fi',
    colors: MATRIX_THEME,
    creator: createMatrixSheet,
    releaseDate: '2024-02-01',
    compatibility: ['1.0.0', '2.0.0'],
  },
  steampunk: {
    id: 'steampunk',
    name: 'Steampunk',
    displayName: '⚙️ Steampunk',
    description:
      'Tema vitoriano com tons de bronze e ouro. Perfeito para aventuras a vapor.',
    price: 5.99,
    category: 'steampunk',
    colors: STEAMPUNK_THEME,
    creator: createSteampunkSheet,
    releaseDate: '2024-02-15',
    compatibility: ['1.0.0', '2.0.0'],
  },
  eldritch: {
    id: 'eldritch',
    name: 'Cosmic Horror',
    displayName: '👁️ Cosmic Horror',
    description:
      'Tema aterrorizante com tons roxos e ciano. Para campanhas Lovecraftianas.',
    price: 5.99,
    category: 'horror',
    colors: ELDRITCH_THEME,
    creator: createEldritchSheet,
    releaseDate: '2024-03-01',
    compatibility: ['1.0.0', '2.0.0'],
  },
};

// ============================================================================
// SISTEMA DE UNLOCK/LICENSE
// ============================================================================

export interface UserLicense {
  userId: string;
  unlockedThemes: string[];
  purchaseDate: string;
  expiryDate?: string; // para subscriptions
  totalSpent: number;
}

export interface ThemePurchaseData {
  themeId: string;
  userId: string;
  purchaseDate: string;
  transactionId: string;
  amount: number;
  paymentMethod: 'card' | 'paypal' | 'stripe';
}

/**
 * Verificar se usuário tem acesso a um tema premium
 * Em produção, isso seria uma chamada para verificar
 * um banco de dados ou uma API no backend
 */
export function isThemePremiumUnlocked(
  userId: string | null,
  themeId: string
): boolean {
  if (!userId) return false;

  // Em produção:
  // const license = await fetch(`/api/user/${userId}/license`)
  //   .then(r => r.json()) as UserLicense;
  // return license.unlockedThemes.includes(themeId);

  // Para demo, salvar em localStorage
  const saved = localStorage.getItem(`theme-license-${userId}`);
  if (saved) {
    const license = JSON.parse(saved) as UserLicense;
    return license.unlockedThemes.includes(themeId);
  }

  return false;
}

/**
 * Registrar uma compra de tema
 */
export function recordThemePurchase(
  purchase: ThemePurchaseData
): Promise<boolean> {
  // Em produção, enviar para backend
  // await fetch('/api/purchase', { method: 'POST', body: JSON.stringify(purchase) })

  // Para demo, salvar em localStorage
  const userPurchases = localStorage.getItem('theme-purchases') || '[]';
  const purchases = JSON.parse(userPurchases) as ThemePurchaseData[];
  purchases.push(purchase);
  localStorage.setItem('theme-purchases', JSON.stringify(purchases));

  // Atualizar license
  let license: UserLicense = {
    userId: purchase.userId,
    unlockedThemes: [],
    purchaseDate: purchase.purchaseDate,
    totalSpent: 0,
  };

  const savedLicense = localStorage.getItem(`theme-license-${purchase.userId}`);
  if (savedLicense) {
    license = JSON.parse(savedLicense);
  }

  license.unlockedThemes.push(purchase.themeId);
  license.totalSpent += purchase.amount;
  license.purchaseDate = purchase.purchaseDate;

  localStorage.setItem(`theme-license-${purchase.userId}`, JSON.stringify(license));

  return Promise.resolve(true);
}

/**
 * Obter temas disponíveis para um usuário
 */
export function getAvailableThemes(userId: string | null) {
  const allThemes = Object.values(PREMIUM_THEMES_CATALOG);

  if (!userId) {
    // Usuário não logado - mostrar apenas temas gratuitos
    return allThemes.filter((t) => t.id === 'xcom' || t.id === 'xcom-light');
  }

  return allThemes.map((theme) => ({
    ...theme,
    isPurchased: isThemePremiumUnlocked(userId, theme.id),
    canPurchase: !isThemePremiumUnlocked(userId, theme.id),
  }));
}

// ============================================================================
// EXEMPLO: COMPONENTE THEME SHOP
// ============================================================================

/*
import React, { useState } from 'react';
import { PREMIUM_THEMES_CATALOG, isThemePremiumUnlocked, recordThemePurchase } from './premiumThemes';
import type { PremiumThemeMeta } from './premiumThemes';

export function ThemeShop({ userId }: { userId: string | null }) {
  const [selectedTheme, setSelectedTheme] = useState<PremiumThemeMeta | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (theme: PremiumThemeMeta) => {
    if (!userId) {
      alert('Você precisa estar logado para comprar temas');
      return;
    }

    setLoading(true);
    try {
      // Em produção: integrar com Stripe/PayPal
      // const result = await fetch('/api/checkout', {
      //   method: 'POST',
      //   body: JSON.stringify({ themeId: theme.id, userId })
      // }).then(r => r.json());

      // Para demo:
      await recordThemePurchase({
        themeId: theme.id,
        userId,
        purchaseDate: new Date().toISOString(),
        transactionId: `demo-${Date.now()}`,
        amount: theme.price,
        paymentMethod: 'stripe',
      });

      alert(`Tema ${theme.displayName} desbloqueado com sucesso!`);
    } catch (error) {
      alert('Erro na compra: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-shop">
      <h2>Temas Premium</h2>
      <div className="themes-grid">
        {Object.values(PREMIUM_THEMES_CATALOG).map((theme) => {
          const isPurchased = userId ? isThemePremiumUnlocked(userId, theme.id) : false;

          return (
            <div key={theme.id} className="theme-card">
              <div className="theme-color-preview">
                <div style={{ backgroundColor: theme.colors.primaryColor }} />
                <div style={{ backgroundColor: theme.colors.secondaryColor }} />
              </div>
              <h3>{theme.displayName}</h3>
              <p>{theme.description}</p>
              <div className="theme-footer">
                <span className="price">${theme.price.toFixed(2)}</span>
                <button
                  disabled={loading || isPurchased}
                  onClick={() => handlePurchase(theme)}
                >
                  {isPurchased ? 'Desbloqueado ✓' : 'Comprar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
*/

// ============================================================================
// BUNDLE DEALS (ofertas)
// ============================================================================

export const BUNDLE_DEALS = {
  allSciFi: {
    id: 'all-sci-fi',
    name: 'All Sci-Fi Bundle',
    description: 'Todos os temas sci-fi: Cyberpunk, Matrix, XCOM',
    themes: ['cyberpunk', 'matrix'],
    regularPrice: 9.98,
    bundlePrice: 7.99,
    savings: 1.99,
  },
  allFantasy: {
    id: 'all-fantasy',
    name: 'Fantasy Bundle',
    description: 'Fantasy Medieval + Steampunk',
    themes: ['fantasy', 'steampunk'],
    regularPrice: 10.98,
    bundlePrice: 8.99,
    savings: 1.99,
  },
  everythingBundle: {
    id: 'everything',
    name: 'Complete Collection',
    description: 'Todos os 5 temas premium',
    themes: ['cyberpunk', 'fantasy', 'matrix', 'steampunk', 'eldritch'],
    regularPrice: 25.95,
    bundlePrice: 19.99,
    savings: 5.96,
  },
};

// ============================================================================
// ESTATÍSTICAS & ANALYTICS
// ============================================================================

export interface ThemeAnalytics {
  totalSales: number;
  totalRevenue: number;
  themeSalesCount: Record<string, number>;
  popularityRank: Array<{
    themeId: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
}

export function generateThemeAnalytics(purchases: ThemePurchaseData[]): ThemeAnalytics {
  const themeSalesCount: Record<string, number> = {};
  let totalRevenue = 0;

  purchases.forEach((purchase) => {
    themeSalesCount[purchase.themeId] = (themeSalesCount[purchase.themeId] || 0) + 1;
    totalRevenue += purchase.amount;
  });

  const popularityRank = Object.entries(themeSalesCount)
    .map(([themeId, count]) => ({
      themeId,
      name: PREMIUM_THEMES_CATALOG[themeId]?.name || themeId,
      sales: count,
      revenue: count * (PREMIUM_THEMES_CATALOG[themeId]?.price || 0),
    }))
    .sort((a, b) => b.sales - a.sales);

  return {
    totalSales: purchases.length,
    totalRevenue,
    themeSalesCount,
    popularityRank,
  };
}
