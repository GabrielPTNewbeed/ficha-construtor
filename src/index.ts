/**
 * Index File - Tudo que você precisa importar
 * 
 * Use este arquivo como ponto central para importar
 * componentes, tipos, templates e temas do XcomCharacterSheet
 */

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export { XcomCharacterSheet } from '../components/XcomCharacterSheet';
export type { XcomCharacterSheetProps } from '../types/sheetTypes';

// ============================================================================
// TEMPLATES
// ============================================================================
export {
  XCOM_COMPLETE_TEMPLATE,
  XCOM_MINIMAL_TEMPLATE,
  XCOM_LIGHT_TEMPLATE,
  createCustomTemplate,
} from '../data/xcomTemplates';

// ============================================================================
// EXEMPLOS & COMPONENTES AUXILIARES
// ============================================================================
export {
  XcomCharacterSheetExample,
  SimpleXcomSheet,
} from '../data/XcomCharacterSheetExample';

// ============================================================================
// TEMAS PREMIUM
// ============================================================================
export {
  CYBERPUNK_THEME,
  createCyberpunkSheet,
  FANTASY_THEME,
  createFantasySheet,
  MATRIX_THEME,
  createMatrixSheet,
  STEAMPUNK_THEME,
  createSteampunkSheet,
  ELDRITCH_THEME,
  createEldritchSheet,
  PREMIUM_THEMES_CATALOG,
  BUNDLE_DEALS,
  isThemePremiumUnlocked,
  recordThemePurchase,
  getAvailableThemes,
  generateThemeAnalytics,
  type PremiumThemeMeta,
  type UserLicense,
  type ThemePurchaseData,
  type ThemeAnalytics,
} from '../data/premiumThemes';

// ============================================================================
// TIPOS
// ============================================================================
export type {
  Position,
  Bounds,
  FieldType,
  Field,
  TableColumn,
  TableConfig,
  StyleObject,
  ThemeConfig,
  SectionStyle,
  SectionType,
  SectionConfig,
  SheetConfig,
  SheetMetadata,
  XcomCharacterSheetProps,
  SheetEvent,
  FieldUpdateEvent,
  TableUpdateEvent,
  StorageConfig,
  SavedSheet,
  ValidationRule,
  ValidationResult,
  ExportFormat,
  ExportOptions,
  ImportOptions,
  UserPermissions,
  SheetPermission,
  SheetLibrary,
  SheetCategory,
  SheetVersion,
  SheetHistory,
  ShareLink,
  SharedSheet,
  Template,
  TemplateReview,
  ApiResponse,
  PaginatedResponse,
  DeepPartial,
} from '../types/sheetTypes';

// ============================================================================
// CONSTANTES
// ============================================================================
export {
  DEFAULT_FIELD_TYPE,
  DEFAULT_SECTION_TYPE,
  DEFAULT_LAYOUT,
  DEFAULT_THEME,
  FIELD_TYPES,
  SECTION_TYPES,
  EXPORT_FORMATS,
  ROLES,
} from '../types/sheetTypes';

// ============================================================================
// TYPE GUARDS
// ============================================================================
export {
  isField,
  isTableColumn,
  isSectionConfig,
  isSheetConfig,
} from '../types/sheetTypes';

// ============================================================================
// ESTILOS
// ============================================================================
// Importar no seu arquivo componente:
// import '../styles/XcomCharacterSheet.css';
