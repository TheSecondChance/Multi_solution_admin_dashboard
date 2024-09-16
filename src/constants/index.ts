//Dashboard Sidebar items
export const SIDEBAR_ITEMS = [
  {
    path: "/",
    key: "Dashboard",
    label: "Dashboard",
    icon: "/dashboard/home.svg",
    isExpandable: false,
  },
  {
    path: "/dashboard/account",
    key: "account",
    label: "Account",
    isExpandable: true,
    children: [
      {
        path: "/dashboard/account/trainee",
        key: "trainee",
        label: "Trainee",
        icon: "/dashboard/account-trainee.svg",
      },
      {
        path: "/dashboard/account/users",
        key: "staff",
        label: "Staff",
        icon: "/dashboard/account-users.svg",
      },
    ],
    icon: "/dashboard/account.svg",
  },

  {
    path: "/dashboard/enrollment",
    key: "enrollment",
    label: "Enrollment",
    icon: "/dashboard/enrollment.svg",
    isExpandable: false,
  },
  {
    path: "/dashboard/finance",
    key: "finance",
    label: "Finance",
    icon: "/dashboard/finance.svg",
    isExpandableTwo: true,
    children: [
      {
        path: "/dashboard/finance/fixed",
        key: "trainee-payment",
        label: "Trainee Payment",
        icon: "/dashboard/account-trainee.svg",
      },
      {
        path: "/dashboard/finance/monthly",
        key: "monthly-payment",
        label: "Monthly Payment",
        icon: "/dashboard/account-users.svg",
      },
      {
        path: "/dashboard/finance/monthly-schedule",
        key: "schedule",
        label: "Schedule",
        icon: "/dashboard/account-users.svg",
      },
    ],
  },
  {
    path: "/dashboard/utils",
    key: "utils",
    label: "Utils",
    icon: "/dashboard/utils.svg",
    isExpandable: false,
  },
]
// Predefined bank options
export const BANK_OPTIONS = [
  {
    key: "Abay Bank",
    label: "Abay Bank",
  },
  {
    key: "Ahadu Bank",
    label: "Ahadu Bank",
  },
  {
    key: "Addis International Bank",
    label: "Addis International Bank",
  },
  {
    key: "Amhara Bank",
    label: "Amhara Bank",
  },
  {
    key: "Awash International Bank",
    label: "Awash International Bank",
  },
  {
    key: "Bank of Abysinnia",
    label: "Bank of Abysinnia",
  },
  {
    key: "Bunna International Bank",
    label: "Bunna International Bank",
  },
  {
    key: "Berhan Bank",
    label: "Berhan Bank",
  },
  {
    key: "Commercial Bank of Ethiopia",
    label: "Commercial Bank of Ethiopia",
  },
  {
    key: "Cooperative Bank Of Oromia",
    label: "Cooperative Bank Of Oromia",
  },
  {
    key: "Dashen Bank",
    label: "Dashen Bank",
  },

  {
    key: "Enat Bank",
    label: "Enat Bank",
  },
  {
    key: "Gadda Bank",
    label: "Gadda Bank",
  },
  {
    key: "Global Bank Cooperation",
    label: "Global Bank Cooperation",
  },
  {
    key: "Hijra Bank",
    label: "Hijra Bank",
  },

  {
    key: "Lion International Bank",
    label: "Lion International Bank",
  },

  {
    key: "Nib Internationl Bank",
    label: "Nib Internationl Bank",
  },
  {
    key: "Oromia Internationl Bank",
    label: "Oromia Internationl Bank",
  },
  {
    key: "Shabelle Bank",
    label: "Shabelle Bank",
  },
  {
    key: "Siket Bank",
    label: "Siket Bank",
  },
  {
    key: "Siinqee Bank",
    label: "Siinqee Bank",
  },
  {
    key: "Tsedey Bank",
    label: "Tsedey Bank",
  },
  {
    key: "Tsehay Bank",
    label: "Tsehay Bank",
  },
  {
    key: "United Bank",
    label: "United Bank",
  },
  {
    key: "Wegagen Bank",
    label: "Wegagen Bank",
  },
  {
    key: "Zemen Bank",
    label: "Zemen Bank",
  },
  {
    key: "Zamzam Bank",
    label: "Zamzam Bank",
  },
]
// Predefined traing types
export const TRAINING_OPTIONS = [
  {
    key: "Automobile",
    label: "Automobile",
  },
  {
    key: "Hizb And",
    label: "Hizb And",
  },
  {
    key: "Hizb Hulet",
    label: "Hizb Hulet",
  },
  {
    key: "Derek And",
    label: "Derek And",
  },
  {
    key: "Derek Hulet",
    label: "Derek Hulet",
  },
  {
    key: "Derek Sost",
    label: "Derek Sost",
  },
  {
    key: "Taxi And",
    label: "Taxi And",
  },
  {
    key: "Taxi Hulet",
    label: "Taxi Hulet",
  },
  {
    key: "Liyu And",
    label: "Liyu And",
  },
  {
    key: "Hizb Hulet",
    label: "Hizb Hulet",
  },
]
