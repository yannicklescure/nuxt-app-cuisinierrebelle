export default async (context, locale) => {
  return await Promise.resolve({
    init: {
      loading: 'Chargement...',
    },
    error: {
      failed: 'Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment, veuillez réessayer plus tard',
    },
    notFound: {
      title: 'Erreur HTTP 404',
      text1: `En informatique, l’erreur 404 est un code du protocole de communication HTTP sur le réseau Internet pour signaler un incident. Ce code est renvoyé par un serveur HTTP pour indiquer qu'aucune ressource, généralement une page web, n'a été trouvée à l'adresse demandée. Le serveur d'hébergement de sites web génère généralement une page web « 404 Fichier introuvable » lorsqu'un utilisateur tente de suivre un lien rompu ou mort ; par conséquent, l'erreur 404 est l'une des erreurs les plus reconnaissables et des plus fréquentes rencontrées sur le World Wide Web.`,
      text2: `Maintenant que vous savez, voici quelques liens pour vous aider:`,
      home: `Page d'accueil`,
      login: `Se connecter`,
      sitemap: `Plan du site`,
    },
    comments: {
      minutes: 'il y a 0 minutes | il y a 1 minute | il y a {count} minutes',
      hours: 'il y a 0 heures | il y a 1 heure | il y a {count} heures',
      days: 'il y a 0 jours | il y a 1 jour | il y a {count} jours',
      months: 'il y a 0 mois | il y a 1 mois | il y a {count} mois',
      years: 'il y a 0 ans | il y a 1 an | il y a {count} ans',
      are_you_sure: 'Êtes-vous sûr ?',
      destroy: 'Supprimer',
      cancel: 'Annuler',
      edit: 'Éditer',
      reply: 'Répondre',
      like: 'Aimer',
      delete: 'Supprimer',
      reply: 'Répondre',
    },
    commentForm: {
      comment: 'Publier',
      cancel: 'Annuler',
      comment: `Commenter`,
      reply: 'Répondre',
    },
    follow: {
      edit: 'Éditer',
      follow: 'Suivre',
      unfollow: 'Se désabonner',
      followed: 'Abonné',
      following: '',
      followers: '',
    },
    message: {
      hello: 'bonjour le monde',
    },
    hashtag: {
      publications: 'Publications',
    },
    item: {
      edit: 'Éditer',
      delete: 'Supprimer',
      delete_q: "Voulez-vous supprimer cette publication ?",
      post: 'Publier',
      pin: 'Épingler',
      pin_q: "Voulez-vous épingler cette publication ?",
      unpin: 'Détacher',
      unpin_q: "Voulez-vous détacher cette publication ?",
      copy_to_clipboard: "Copier le lien",
      copy_success: 'Lien copié',
      share: 'Partager cette publication',
      share_btn: 'Partager',
      forward: 'Transférer',
      deleted: 'Cette publication a été supprimée.'
    },
    itemNewForm: {
      cancel: 'Annuler',
      cancel_q: "Voulez-vous annuler cette publication ?",
      post: 'Publier',
      whats_happening: "Que se passe-t-il ?",
    },
    user: {
      publications: 'Publications',
      banner: {
        memberSince: 'Membre depuis {date}',
      }
    },
    page: {
      new: {
        content: 'Contenu',
        locale: 'Langue',
        contentHelp: '{count} caractères restant.',
        title: 'Titre',
        submit: 'Publier',
        errors: {
          title: 'Le titre est obligatoire.',
          content: 'Le contenu de publication est obligatoire.',
        },
      },
      edit: {
        select: 'Sélectionner une langue',
      }
    },
    pages: {
      edit: 'Editer',
      locale: 'Langue',
      title: 'Titre',
    },
    posts: {
      publications: 'Publications',
    },
    post: {
      answer: 'Répondre',
      add_comment: 'Ajouter un commentaire',
    },
    filter: {
      title: `Filtrer période`,
      today: `Aujourd'hui`,
      day: `24 heures`,
      week: `7 jours`,
      month: `30 jours`,
      all: `Depuis le début`,
    },
    navbar: {
      pages: 'Pages',
      admin: 'Administration',
      brand: 'Cuisinier Rebelle',
      cancel: 'Annuler',
      logout: 'Se déconnecter',
      login: 'Se connecter',
      getStarted: `Créer un compte`,
      // admin_html: <i class="material-icons md-18">settings</i>
      are_you_sure: 'Êtes-vous sûr ?',
      // bookmarks_html: <i class="material-icons md-18">bookmarks</i>
      conversion: 'Table de conversion',
      cuisinier_rebelle: 'Cuisinier rebelle',
      english_html: 'English',
      following: 'Mes abonnements',
      french_html: 'Français',
      inbox: 'Messages',
      // languages_html: <i class="material-icons md-18">language</i>
      log_out: 'Se déconnecter',
      // menu_modal_html: <i class="material-icons md-18">more_vert</i>
      new_recipe: 'Nouvelle recette',
      // notifications_html: <i class="material-icons md-18">notifications</i>
      recipes: 'Mes recettes',
      settings: 'Paramètres',
      sign_in: 'Se connecter',
      spanish_html: 'Español',
      tools: 'Matériel de cuisine',
      top_100: 'Top 100',
      bookmarks: 'Mes favoris',
      search: 'Rechercher une recette',
      // top_100_html: <i class="material-icons md-18">whatshot</i>
    },
    login: {
      facebook: {
        login: 'Se connecter avec Facebook',
        logout: 'Se déconnecter',
        working: 'Chargement ...',
      },
      email: 'Adresse Courriel',
      password: 'Mot de passe',
      submit: 'Se connecter',
      signup: `Créer un compte`,
      disclaimer: "Nous ne partagerons jamais vos données personnelles.",
      welcome: 'Bienvenue, {firstName} !',
      resendConfirmationInstructions: 'Nous avons envoyé une courriel à {email} !',
      forgetPassword: 'Mot de passe oublié ?',
      password: {
        request: {
          title: 'Retrouvez votre compte',
          text: `Veuillez saisir l'adresse courriel de votre compte utilisateur et nous vous enverrons un lien de réinitialisation du mot de passe.`,
          resendConfirmationInstructions: 'Renvoyer les instructions de confirmation.',
          submit: 'Envoyer',
        },
        reset: {
          title: 'Réinitialisation de votre mot de passe',
          text0: `{firstName}, veuillez saisir votre nouveau mot de passe.`,
          text1: `Token expiré. Veuillez renouveler votre demande de réinitialisation du mot de passe.`,
          submit: 'Envoyer',
          success: 'Votre mot de passe a été changé.',
        },
        email: 'Un courriel avec les instructions pour changer votre mot de passe vous a été envoyé !',
      }
    },
    signUp: {
      confirmation: 'Confirmation du mot de passe',
      disclaimer: "Nous ne partagerons jamais vos données personnelles.",
      email: 'Adresse Courriel',
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      login: 'Se connecter',
      password: 'Mot de passe',
      signup: `S'inscrire`,
      submit: `S'inscrire`,
      success: 'Vous allez recevoir sous quelques minutes un courriel comportant des instructions pour confirmer votre compte.',
      errors: {
        email: `L'adresse courriel est obligatoire.`,
        emailFormat: `Ceci n'est pas une adresse courriel.`,
        firstName: 'Le prénom est obligatoire.',
        lastName: 'Le nom de famille est obligatoire.',
        password: 'Le mot de passe est obligatoire.',
        confirmation: 'Le mot de passe saisi ne correspond pas à la confirmation.',
        passwordLength: 'Veuillez saisir au moins 8 caractères.'
      },
    },
    banner: {
      login: 'Se connecter',
      getStarted: `Créer un compte`,
      introduction: 'Partagez vos recettes dès maintenant<br/>en toute simplicité',
      seeRecipes: 'Voir les recettes',
    },
    userBanner: {
      followers: '0 Abonnés | 1 Abonné | {count} Abonnés',
      recipes: '0 Recettes | 1 Recette | {count} Recettes',
      // apple: 'no apples | one apple | {count} apples',
    },
    recipe: {
      edit: 'Éditer cette recette',
      otherRecipes: 'Autres recettes',
      comments: {
        counts: '0 Commentaires | 1 Commentaire | {count} Commentaires',
        addPublicComment: 'Ajouter un commentaire public...',
        viewReplies: '0 réponses | 1 réponse | {count} réponses',
      },
      delete: {
        submit: 'Supprimer',
        are_you_sure: 'Êtes-vous sûr ?',
        okText: 'Supprimer',
        cancelText: 'Annuler',
      },
      new: {
        title: 'Titre',
        subtitle: 'Sous-titre',
        video: 'Adresse vidéo YouTube',
        direction: 'Contenu de publication',
        tags: 'Tags',
        tagsHelp: 'Séparer chaque tag par une virgule.',
        browse: 'Ajouter une photo',
        chooseFile: 'Chercher',
        photo: 'Photo',
        submit: 'Publier',
        description: 'Description',
        descriptionHelp: '{count} caractères restant.',
        errors: {
          youtubeVideoUrl: 'Le lien doit être un lien YouTube.',
          title: 'Le titre est obligatoire.',
          direction: 'Le contenu de publication est obligatoire.',
          photo: 'La photo est obligatoire.',
        },
      }
    },
    search: {
      noResult: `Désolé, nous n'avons trouvé aucun résultat correspondant à <em>"{query}"</em>. Merci d'essayer de nouveau avec un autre mot-clé.`
    },
    follow: {
      followers: '0 Abonnés | 1 Abonné | {count} Abonnés',
      following: '0 Abonnements | 1 Abonnement | {count} Abonnements',
      follow: `S'abonner`,
      unfollow: `Se désabonner`,
    },
    RegistrationConfirmation: {
      success: '{firstName}, votre compte est maintenant actif.',
    },
    notifications: {
      like: {
        recipe: '{user} a aimé votre recette.',
        comment: '{user} a aimé votre commentaire.',
        reply: '{user} a aimé votre réponse.',
      }
    },
    footer: {
      madeWith: 'Fait avec',
      brand: 'par Cuisinier Rebelle &copy; {year}',
      sitemap: 'Plan du site',
      privacyPolicy: 'Politique de confidentialité',
      help: 'Aide',
      url: {
        sitemap: 'plan-du-site',
        privacyPolicy: 'confidentialite',
        help: 'aide',
      }
    },
    userSettings: {
      title: 'Paramètres',
      getEmailNotifications: 'Recevoir les notifications par courriel',
      deleteAccount: 'Supprimer mon compte',
    },
    userDelete: {
      title: 'Supprimer mon compte',
      email: 'Vérification de votre adresse courriel',
      submit: 'Supprimer mon compte',
      success: 'Votre compte a été supprimé.',
      text1: 'Désolé de vous voir partir!',
      text2: 'Si vous rencontrez un problème sur Cuisinier Rebelle, pensez à ',
      text3: 'nous contacter',
      text4: ' à ce sujet avant de supprimer votre compte.',
      text5: 'La suppression de votre compte supprimera le contenu des publications et des commentaires que vous avez faits sur Cuisinier Rebelle.',
      form: 'POURQUOI SUPPRIMEZ-VOUS CE COMPTE? (OPTIONNEL)',
      checkbox: 'Je comprends que supprimer mon compte est irréversible.',
    },
    users: {
      settings: {
        title: 'Paramètres',
        back: 'Retour',
        photo: {
          browse: 'Ajouter une photo',
          chooseFile: 'Chercher',
          title: 'Changer ma photo de profile',
          photo: 'Photo',
          submit: 'Publier',
          success: 'Vous avez changé votre photo de profile.',
          errors: {
            photo: 'La photo est obligatoire.',
          },
          errors: 'La photo est obligatoire.',
        }
      },
      password:{
        errors: {
          exist: `Votre adresse courriel n'a pas été trouvé.`
        }
      }
    }
  })
}
