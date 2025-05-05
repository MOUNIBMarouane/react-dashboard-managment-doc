
export interface Translations {
  settings: {
    theme: string;
    lightMode: string;
    darkMode: string;
    language: string;
    selectLanguage: string;
    background: string;
    useCustomBg: string;
    uploadBg: string;
  };
  common: {
    search: string;
    searchBy: string;
    filter: string;
    all: string;
    loading: string;
    noResults: string;
    edit: string;
    delete: string;
    cancel: string;
    confirm: string;
    save: string;
    create: string;
    actions: string;
    name: string;
    description: string;
    status: string;
    date: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    settings: {
      theme: "Theme",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      language: "Language",
      selectLanguage: "Select language",
      background: "Background",
      useCustomBg: "Use custom background",
      uploadBg: "Click to upload an image"
    },
    common: {
      search: "Search...",
      searchBy: "Search by",
      filter: "Filter",
      all: "All",
      loading: "Loading...",
      noResults: "No results found",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      create: "Create",
      actions: "Actions",
      name: "Name",
      description: "Description",
      status: "Status",
      date: "Date"
    }
  },
  fr: {
    settings: {
      theme: "Thème",
      lightMode: "Mode Clair",
      darkMode: "Mode Sombre",
      language: "Langue",
      selectLanguage: "Sélectionner la langue",
      background: "Arrière-plan",
      useCustomBg: "Utiliser un arrière-plan personnalisé",
      uploadBg: "Cliquez pour télécharger une image"
    },
    common: {
      search: "Rechercher...",
      searchBy: "Rechercher par",
      filter: "Filtrer",
      all: "Tous",
      loading: "Chargement...",
      noResults: "Aucun résultat trouvé",
      edit: "Modifier",
      delete: "Supprimer",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Sauvegarder",
      create: "Créer",
      actions: "Actions",
      name: "Nom",
      description: "Description",
      status: "Statut",
      date: "Date"
    }
  },
  es: {
    settings: {
      theme: "Tema",
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
      language: "Idioma",
      selectLanguage: "Seleccionar idioma",
      background: "Fondo",
      useCustomBg: "Usar fondo personalizado",
      uploadBg: "Haga clic para subir una imagen"
    },
    common: {
      search: "Buscar...",
      searchBy: "Buscar por",
      filter: "Filtrar",
      all: "Todos",
      loading: "Cargando...",
      noResults: "No se encontraron resultados",
      edit: "Editar",
      delete: "Eliminar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Guardar",
      create: "Crear",
      actions: "Acciones",
      name: "Nombre",
      description: "Descripción",
      status: "Estado",
      date: "Fecha"
    }
  }
};
