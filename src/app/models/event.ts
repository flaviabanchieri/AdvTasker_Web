export interface CalendarEvent {
  id: string; // Identificador único do evento
  groupId?: string; // Eventos com mesmo groupId serão redimensionados juntos
  allDay?: boolean; // Define se o evento é de dia inteiro
  start: Date | string; // Data/hora de início do evento (aceita Date ou string ISO)
  end?: Date | string; // Data/hora de fim do evento (opcional)
  startStr?: string; // Representação ISO da data inicial (usado pelo FullCalendar)
  endStr?: string; // Representação ISO da data final (usado pelo FullCalendar)
  title: string; // Título do evento
  url?: string; // Link ao clicar no evento
  classNames?: string[]; // Classes CSS personalizadas
  editable?: boolean; // Define se o evento pode ser editado
  startEditable?: boolean; // Se a data de início pode ser editada
  durationEditable?: boolean; // Se a duração pode ser alterada
  resourceEditable?: boolean; // Se os recursos podem ser editados
  display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none'; // Tipo de exibição do evento
  overlap?: boolean; // Se o evento pode sobrepor outros eventos
  constraint?: any; // Restrições para movimentação do evento
  backgroundColor?: string; // Cor de fundo do evento
  borderColor?: string; // Cor da borda do evento
  textColor?: string; // Cor do texto do evento
  extendedProps?: { [key: string]: any }; // Propriedades adicionais personalizadas
  source?: any; // Fonte do evento (caso tenha sido carregado dinamicamente)
}
