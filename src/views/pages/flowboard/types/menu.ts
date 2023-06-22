export type ContextMenuOptionType = {
    icon: React.ReactNode;
    label: string;
    action: () => any;
    shortcut?: string | undefined;
};
