/**
 * Index File - Exports for TTRPG Character Sheet Builder
 *
 * Central export point for canvas-based character sheet components,
 * templates, and utilities.
 */

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export { default as CanvasSheet } from './components/CanvasSheet';

// ============================================================================
// TEMPLATES
// ============================================================================
export { DND5E_TEMPLATE } from './data/dnd5eTemplate';
export { XCOM_TEMPLATE } from './data/xcomTemplate';

// ============================================================================
// UTILITIES
// ============================================================================
export { default as WidgetEditor } from './components/WidgetEditor';
export { default as FieldRenderer } from './components/FieldRenderer';
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
