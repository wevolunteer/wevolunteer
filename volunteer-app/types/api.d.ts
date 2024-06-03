/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/activities": {
    /** List activities */
    get: operations["activities-list"];
    /** Create activity */
    post: operations["activities-create"];
  };
  "/activities/{id}": {
    /** Update activity */
    put: operations["activities-update"];
    /** Delete activity */
    delete: operations["activities-delete"];
  };
  "/auth/refresh": {
    /** Refresh token */
    post: operations["refresh-token"];
  };
  "/auth/request-code": {
    /** Request code */
    post: operations["request-code"];
  };
  "/auth/user": {
    /** Get user info */
    get: operations["user-info"];
    /** Update user profile */
    patch: operations["users-profile-update"];
  };
  "/auth/verify-code": {
    /** Verify code */
    post: operations["verify-code"];
  };
  "/experiences": {
    /** List enrollments */
    get: operations["experiences-list"];
    /** Create enrollment */
    post: operations["experiences-create"];
  };
  "/experiences/{id}": {
    /** Delete enrollment */
    delete: operations["experiences-delete"];
    /** Update enrollment */
    patch: operations["experiences-update"];
  };
  "/login": {
    /** Login */
    post: operations["login"];
  };
  "/organizations": {
    /** List organizations */
    get: operations["organizations-list"];
    /** Create organization */
    post: operations["organizations-create"];
  };
  "/organizations/{id}": {
    /** Get organization */
    get: operations["organizations-get"];
    /** Delete organization */
    delete: operations["organizations-delete"];
    /** Update organization */
    patch: operations["organizations-update"];
  };
  "/signup": {
    /** Signup */
    post: operations["signup"];
  };
  "/users": {
    /** List users */
    get: operations["users-list"];
    /** Create user */
    post: operations["user-create"];
  };
  "/users/:id": {
    /** Delete user */
    delete: operations["user-delete"];
    /** Update user */
    patch: operations["user-update"];
  };
  "/users/{id}": {
    /** Get user */
    get: operations["user-get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Activity: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      address: string;
      category: components["schemas"]["Category"];
      /** Format: int64 */
      category_id: number;
      city: string;
      contact_email: string;
      contact_name: string;
      contact_phone: string;
      country: string;
      /** Format: date-time */
      created_at: string;
      description: string;
      /** Format: date-time */
      end_date: string;
      end_time: string;
      /** Format: int64 */
      id: number;
      image: string;
      is_recurring: boolean;
      /** Format: double */
      latitude: number;
      /** Format: double */
      longitude: number;
      organization: components["schemas"]["Organization"];
      /** Format: int64 */
      organization_id: number;
      published: boolean;
      schedule: components["schemas"]["ActivitySchedule"];
      /** Format: date-time */
      start_date: string;
      start_time: string;
      state: string;
      title: string;
      uid: string;
      /** Format: date-time */
      updated_at: string;
      zip_code: string;
    };
    ActivityCreateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      title: string;
    };
    ActivityListData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      results: components["schemas"]["Activity"][];
    };
    ActivitySchedule: {
      friday: boolean;
      /** Format: int64 */
      id: number;
      monday: boolean;
      saturday: boolean;
      sunday: boolean;
      thursday: boolean;
      tuesday: boolean;
      wednesday: boolean;
    };
    ActivityUpdateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      title: string;
    };
    Category: {
      code: string;
      /** Format: int64 */
      id: number;
      name: string;
    };
    DeletedAt: {
      /** Format: date-time */
      Time: string;
      Valid: boolean;
    };
    ErrorDetail: {
      /** @description Where the error occurred, e.g. 'body.items[3].tags' or 'path.thing-id' */
      location?: string;
      /** @description Error message text */
      message?: string;
      /** @description The value at the given location */
      value?: unknown;
    };
    ErrorModel: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      /** @description A human-readable explanation specific to this occurrence of the problem. */
      detail?: string;
      /** @description Optional list of individual error details */
      errors?: components["schemas"]["ErrorDetail"][];
      /**
       * Format: uri
       * @description A URI reference that identifies the specific occurrence of the problem.
       */
      instance?: string;
      /**
       * Format: int64
       * @description HTTP status code
       */
      status?: number;
      /** @description A short, human-readable summary of the problem type. This value should not change between occurrences of the error. */
      title?: string;
      /**
       * Format: uri
       * @description A URI reference to human-readable documentation for the error.
       * @default about:blank
       */
      type?: string;
    };
    Experience: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      activity: components["schemas"]["Activity"];
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      date: string;
      /** Format: int64 */
      id: number;
      message: string;
      status: string;
      /** Format: date-time */
      updated_at: string;
      user: components["schemas"]["User"];
    };
    ExperienceCreateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      /** Format: int64 */
      activity_id: number;
      /** Format: date-time */
      date: string;
      message: string;
    };
    ExperienceListData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      results: components["schemas"]["Experience"][];
    };
    ExperienceUpdateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      /** Format: date-time */
      date: string;
      message: string;
    };
    LoginData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      email: string;
      password: string;
    };
    Organization: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      DeletedAt: components["schemas"]["DeletedAt"];
      address: string;
      category: components["schemas"]["Category"];
      /** Format: int64 */
      category_id: number;
      city: string;
      country: string;
      /** Format: date-time */
      created_at: string;
      email: string;
      external_id: string;
      /** Format: int64 */
      id: number;
      /** Format: double */
      latitude: number;
      logo: string;
      /** Format: double */
      longitude: number;
      name: string;
      phone: string;
      published: boolean;
      state: string;
      tax_code: string;
      uid: string;
      /** Format: date-time */
      updated_at: string;
      vat_code: string;
      website: string;
      zip_code: string;
    };
    OrganizationCreateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      name: string;
      phone: string;
    };
    OrganizationUpdateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      email: string;
      external_id: string;
      name: string;
      phone: string;
    };
    RefreshTokenData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      refresh_token: string;
    };
    RequestCodeData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      email: string;
    };
    SignupData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      email: string;
      first_name: string;
      last_name: string;
      password: string;
    };
    TokenData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      access_token: string;
      refresh_token: string;
    };
    User: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      accepted_newsletter: boolean;
      accepted_tos: boolean;
      avatar: string;
      bio: string;
      /** Format: date-time */
      created_at: string;
      email: string;
      first_name: string;
      /** Format: int64 */
      id: number;
      is_email_verified: boolean;
      is_superuser: boolean;
      last_name: string;
      phone: string;
      tax_code: string;
      uid: string;
      /** Format: date-time */
      updated_at: string;
    };
    UserCreateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      email: string;
      first_name: string;
      is_superuser: boolean;
      last_name: string;
      password: string;
      phone: string;
    };
    UserProfileUpdateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      accepted_newsletter?: boolean;
      accepted_tos?: boolean;
      avatar?: string;
      bio?: string;
      date_of_birth?: string;
      email?: string;
      first_name?: string;
      last_name?: string;
      /** Format: double */
      latitude?: number;
      /** Format: double */
      longitude?: number;
      phone?: string;
      tax_code?: string;
    };
    UserUpdateData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      email: string;
      first_name: string;
      is_superuser: boolean;
      last_name: string;
      phone: string;
    };
    VerifyCodeData: {
      /**
       * Format: uri
       * @description A URL to the JSON Schema for this object.
       */
      $schema?: string;
      code: string;
      email: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /** List activities */
  "activities-list": {
    parameters: {
      query?: {
        q?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["ActivityListData"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Create activity */
  "activities-create": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ActivityCreateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Activity"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Update activity */
  "activities-update": {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ActivityUpdateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Activity"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Delete activity */
  "activities-delete": {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description No Content */
      204: {
        content: never;
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Refresh token */
  "refresh-token": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RefreshTokenData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TokenData"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Request code */
  "request-code": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RequestCodeData"];
      };
    };
    responses: {
      /** @description No Content */
      204: {
        content: never;
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Get user info */
  "user-info": {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Update user profile */
  "users-profile-update": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserProfileUpdateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Verify code */
  "verify-code": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["VerifyCodeData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TokenData"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** List enrollments */
  "experiences-list": {
    parameters: {
      query?: {
        q?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["ExperienceListData"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Create enrollment */
  "experiences-create": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ExperienceCreateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Experience"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Delete enrollment */
  "experiences-delete": {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description No Content */
      204: {
        content: never;
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Update enrollment */
  "experiences-update": {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ExperienceUpdateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Experience"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Login */
  login: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TokenData"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** List organizations */
  "organizations-list": {
    parameters: {
      query?: {
        q?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"][];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Create organization */
  "organizations-create": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrganizationCreateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Get organization */
  "organizations-get": {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Delete organization */
  "organizations-delete": {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description No Content */
      204: {
        content: never;
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Update organization */
  "organizations-update": {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrganizationUpdateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Signup */
  signup: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignupData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TokenData"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** List users */
  "users-list": {
    parameters: {
      query?: {
        query?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"][];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Create user */
  "user-create": {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Delete user */
  "user-delete": {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description No Content */
      204: {
        content: never;
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Update user */
  "user-update": {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUpdateData"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
  /** Get user */
  "user-get": {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Error */
      default: {
        content: {
          "application/problem+json": components["schemas"]["ErrorModel"];
        };
      };
    };
  };
}
