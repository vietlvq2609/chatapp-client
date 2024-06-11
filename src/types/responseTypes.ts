interface TUser {
   user_id: string;
   username: string;
   profile_photo_url: string;
   phone_number: string;
   email: string;
   date_of_birth: string;
}

interface TMessage {
   message_id: number;
   sender: TUser;
   message_text: string;
   sent_at: string;
   conversation_id: number;
}

interface TConversation {
   conversation_id: number;
   conversation_name: string | null;
   members: TUser[];
   messages: TMessage[];
}

interface TApiErrorResponse {
   http_status: string;
   message: string;
   payload: Object | null;
   success: boolean;
   timestamp: string;
   error_type: string;
}

interface TAxiosError {
   code: string;
   config: Object;
   message: string;
   name: string;
   request: XMLHttpRequest;
   response: {
      config: Object;
      data: TApiErrorResponse;
      headers: Object;
      request: Object;
      status: number;
      statusText: string;
   };
}

export type { TUser, TMessage, TConversation, TAxiosError };
