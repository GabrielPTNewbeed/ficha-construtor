/**
 * TYPE DEFINITIONS - XcomCharacterSheet
 * 
 * Tipos reutilizáveis para o componente de ficha
 * Importe daqui em seus arquivos para melhor type-safety
 */

// ============================================================================
// POSIÇÃO E LAYOUT
// ============================================================================

export interface Position {
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

// ============================================================================
// CAMPOS (FIELDS)
// ============================================================================

export type FieldType = 'text' | 'number' | 'progress-bar' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio';

export interface Field {
  name: string;
  type: FieldType;
  value?: string | number | boolean;
  default?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => boolean;
  options?: string[]; // para select e radio
  min?: number;
  max?: number;
  step?: number;
  style?: StyleObject;
  help?: string; // texto de ajuda
}

// ============================================================================
// TABELAS
// ============================================================================

export interface TableColumn {
  header: string;
  width: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  editable?: boolean;
  type?: 'text' | 'number' | 'select'; // tipo de dados na coluna
}

export interface TableConfig {
  columns: TableColumn[];
  rows: (string | number | boolean)[][];
  maxRows?: number;
  minRows?: number;
  editable?: boolean;
  selectable?: boolean;
}

// ============================================================================
// ESTILO
// ============================================================================

export type StyleObject = Record<string, string | number>;

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  borderRadius?: number;
  boxShadow?: string;
  accentColor?: string;
}

export interface SectionStyle extends StyleObject {
  // Propriedades booleanas ao invés de union types para evitar conflito com Record
  // Use como strings no objeto: { border: 'laser-grid', rowColor: '#fff', etc }
}

// ============================================================================
// SEÇÕES
// ============================================================================

export type SectionType = 'form' | 'table' | 'attributes' | 'custom';

export interface SectionConfig {
  id: string;
  title: string;
  description?: string;
  position: Position;
  fields?: Field[];
  columns?: TableColumn[];
  rows?: (string | number)[][];
  type?: SectionType;
  style?: SectionStyle;
  icon?: string; // emoji ou ícone
  locked?: boolean; // para impedir edições
  hidden?: boolean;
  order?: number; // para ordenação
  minHeight?: number;
  maxHeight?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// ============================================================================
// FICHA COMPLETA
// ============================================================================

export interface SheetConfig {
  id?: string; // ID único da ficha
  name: string;
  description: string;
  version?: string;
  layout: 'grid' | 'flex' | 'absolute';
  sections: SectionConfig[];
  globalStyle?: Partial<ThemeConfig>;
  metadata?: SheetMetadata;
}

export interface SheetMetadata {
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  version?: string;
  tags?: string[];
  template?: string; // nome do template usado
}

// ============================================================================
// PROPS DO COMPONENTE
// ============================================================================

export interface XcomCharacterSheetProps {
  data: SheetConfig;
  editMode?: boolean;
  theme?: 'xcom' | 'xcom-light' | 'custom';
  customTheme?: Partial<ThemeConfig>;
  onDataChange?: (updatedData: SheetConfig) => void;
  onSectionUpdate?: (section: SectionConfig) => void;
  onFieldUpdate?: (sectionId: string, fieldIndex: number, value: any) => void;
  readOnly?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  onExport?: (data: SheetConfig) => void;
  onImport?: (data: SheetConfig) => void;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// EVENTOS
// ============================================================================

export interface SheetEvent {
  type: 'update' | 'save' | 'load' | 'export' | 'import' | 'delete';
  data: any;
  timestamp: Date;
}

export interface FieldUpdateEvent {
  sectionId: string;
  fieldIndex: number;
  oldValue: any;
  newValue: any;
  fieldName: string;
}

export interface TableUpdateEvent {
  sectionId: string;
  rowIndex: number;
  colIndex: number;
  oldValue: any;
  newValue: any;
}

// ============================================================================
// STORAGE & PERSISTENCE
// ============================================================================

export interface StorageConfig {
  type: 'localStorage' | 'sessionStorage' | 'indexedDB' | 'firestore' | 'custom';
  key: string;
  autoSave?: boolean;
  autoSaveInterval?: number; // em ms
  encryption?: boolean;
}

export interface SavedSheet {
  id: string;
  name: string;
  data: SheetConfig;
  createdAt: string;
  updatedAt: string;
  size: number; // em bytes
}

// ============================================================================
// VALIDAÇÃO
// ============================================================================

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string[]>; // sectionId/fieldName -> array de erros
}

// ============================================================================
// EXPORTAÇÃO & IMPORTAÇÃO
// ============================================================================

export type ExportFormat = 'json' | 'pdf' | 'png' | 'html' | 'csv';

export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  includeMetadata?: boolean;
  compress?: boolean;
  theme?: boolean;
}

export interface ImportOptions {
  overwrite?: boolean;
  merge?: boolean;
  validate?: boolean;
}

// ============================================================================
// USUÁRIO & PERMISSÕES
// ============================================================================

export interface UserPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canShare: boolean;
  canViewHistory: boolean;
}

export interface SheetPermission {
  userId: string;
  sheetId: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: UserPermissions;
  grantedAt: string;
}

// ============================================================================
// GERENCIAMENTO DE FICHAS
// ============================================================================

export interface SheetLibrary {
  sheets: SavedSheet[];
  favorites: string[]; // IDs de fichas favoritas
  recent: string[]; // IDs recentes
  archived: string[]; // IDs arquivadas
}

export interface SheetCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  sheets: string[]; // IDs de fichas
  color?: string;
}

// ============================================================================
// HISTÓRICO & VERSIONAMENTO
// ============================================================================

export interface SheetVersion {
  versionNumber: number;
  data: SheetConfig;
  createdAt: string;
  createdBy: string;
  changeDescription?: string;
}

export interface SheetHistory {
  sheetId: string;
  versions: SheetVersion[];
  currentVersion: number;
}

// ============================================================================
// COMPARTILHAMENTO
// ============================================================================

export interface ShareLink {
  id: string;
  sheetId: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  accessLevel: 'view' | 'edit';
  password?: string;
  maxViews?: number;
  currentViews: number;
}

export interface SharedSheet extends SavedSheet {
  sharedBy: string;
  sharedAt: string;
  accessLevel: 'view' | 'edit';
}

// ============================================================================
// TEMPLATE
// ============================================================================

export interface Template extends SheetConfig {
  templateId: string;
  popularity?: number;
  downloads?: number;
  rating?: number;
  reviews?: TemplateReview[];
  category?: string;
  previews?: string[];
}

export interface TemplateReview {
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isField(obj: any): obj is Field {
  return obj && typeof obj === 'object' && 'name' in obj && 'type' in obj;
}

export function isTableColumn(obj: any): obj is TableColumn {
  return obj && typeof obj === 'object' && 'header' in obj && 'width' in obj;
}

export function isSectionConfig(obj: any): obj is SectionConfig {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'title' in obj &&
    'position' in obj
  );
}

export function isSheetConfig(obj: any): obj is SheetConfig {
  return (
    obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'description' in obj &&
    'sections' in obj &&
    Array.isArray(obj.sections)
  );
}

// ============================================================================
// CONST DEFAULTS
// ============================================================================

export const DEFAULT_FIELD_TYPE: FieldType = 'text';
export const DEFAULT_SECTION_TYPE: SectionType = 'form';
export const DEFAULT_LAYOUT = 'grid' as const;
export const DEFAULT_THEME = 'xcom' as const;

export const FIELD_TYPES: FieldType[] = [
  'text',
  'number',
  'progress-bar',
  'textarea',
  'select',
  'date',
  'checkbox',
  'radio',
];

export const SECTION_TYPES: SectionType[] = ['form', 'table', 'attributes', 'custom'];

export const EXPORT_FORMATS: ExportFormat[] = ['json', 'pdf', 'png', 'html', 'csv'];

export const ROLES: Array<'admin' | 'editor' | 'viewer'> = ['admin', 'editor', 'viewer'];

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// ============================================================================
// NOTA: NÃO importar de premiumThemes aqui para evitar import circular
// Import premiumThemes diretamente quando necessário:
// import { CYBERPUNK_THEME, ... } from '../data/premiumThemes';
// ============================================================================
