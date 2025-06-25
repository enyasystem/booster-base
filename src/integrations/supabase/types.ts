export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_balance: {
        Row: {
          created_at: string | null
          deposit_amount: number | null
          id: string
          user_id: string
          withdrawal_amount: number | null
        }
        Insert: {
          created_at?: string | null
          deposit_amount?: number | null
          id?: string
          user_id: string
          withdrawal_amount?: number | null
        }
        Update: {
          created_at?: string | null
          deposit_amount?: number | null
          id?: string
          user_id?: string
          withdrawal_amount?: number | null
        }
        Relationships: []
      }
      achievements: {
        Row: {
          badge_url: string | null
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          badge_url?: string | null
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          badge_url?: string | null
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      ai_preferences: {
        Row: {
          ai_name: string | null
          created_at: string
          id: string
          personality_traits: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_name?: string | null
          created_at?: string
          id?: string
          personality_traits?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_name?: string | null
          created_at?: string
          id?: string
          personality_traits?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bets: {
        Row: {
          bet_type: string
          created_at: string | null
          event_name: string
          id: string
          notes: string | null
          odds: number
          potential_profit: number
          result: number | null
          selection: string
          settled_at: string | null
          sport_type: string | null
          stake: number
          status: Database["public"]["Enums"]["bet_status"] | null
          user_id: string
        }
        Insert: {
          bet_type: string
          created_at?: string | null
          event_name: string
          id?: string
          notes?: string | null
          odds: number
          potential_profit: number
          result?: number | null
          selection: string
          settled_at?: string | null
          sport_type?: string | null
          stake: number
          status?: Database["public"]["Enums"]["bet_status"] | null
          user_id: string
        }
        Update: {
          bet_type?: string
          created_at?: string | null
          event_name?: string
          id?: string
          notes?: string | null
          odds?: number
          potential_profit?: number
          result?: number | null
          selection?: string
          settled_at?: string | null
          sport_type?: string | null
          stake?: number
          status?: Database["public"]["Enums"]["bet_status"] | null
          user_id?: string
        }
        Relationships: []
      }
      booking_payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          id: string
          payment_method: string | null
          split_payment: boolean | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          split_payment?: boolean | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          split_payment?: boolean | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          address: string | null
          booking_date: string
          booking_time: string
          client_ip: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          is_home_service: boolean | null
          service_id: string | null
          status: string | null
          total_amount_naira: number
          user_id: string | null
        }
        Insert: {
          address?: string | null
          booking_date: string
          booking_time: string
          client_ip?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          is_home_service?: boolean | null
          service_id?: string | null
          status?: string | null
          total_amount_naira: number
          user_id?: string | null
        }
        Update: {
          address?: string | null
          booking_date?: string
          booking_time?: string
          client_ip?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          is_home_service?: boolean | null
          service_id?: string | null
          status?: string | null
          total_amount_naira?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          challenge: string
          client_name: string | null
          completion_date: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          industry: string | null
          results: string
          service_id: string | null
          solution: string
          title: string
          updated_at: string
        }
        Insert: {
          challenge: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          industry?: string | null
          results: string
          service_id?: string | null
          solution: string
          title: string
          updated_at?: string
        }
        Update: {
          challenge?: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          industry?: string | null
          results?: string
          service_id?: string | null
          solution?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_studies_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_offered"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          created_at: string
          id: string
          is_ai_message: boolean | null
          message: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_ai_message?: boolean | null
          message: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_ai_message?: boolean | null
          message?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_user_id_fkey",
            columns: ["user_id"],
            isOneToOne: false,
            referencedRelation: "profiles",
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string | null
          id: string
          industry: string | null
          logo_url: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry?: string | null
          logo_url: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          industry?: string | null
          logo_url?: string
          name?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          listing_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          listing_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          listing_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          additional_notes: string | null
          amount_naira: number
          consultation_date: string
          created_at: string | null
          email: string
          id: string
          name: string
          payment_provider:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_reference: string | null
          service_type: string
          status: Database["public"]["Enums"]["consultation_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_notes?: string | null
          amount_naira: number
          consultation_date: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          payment_provider?:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_reference?: string | null
          service_type: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_notes?: string | null
          amount_naira?: number
          consultation_date?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          payment_provider?:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_reference?: string | null
          service_type?: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      content_management: {
        Row: {
          content: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          meta_data: Json | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          meta_data?: Json | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          meta_data?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      customer_points: {
        Row: {
          created_at: string
          id: string
          points: number | null
          total_earned: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          points?: number | null
          total_earned?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          points?: number | null
          total_earned?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      discount_codes: {
        Row: {
          code: string
          created_at: string | null
          current_uses: number | null
          discount_percentage: number
          id: string
          max_uses: number | null
          updated_at: string | null
          valid_from: string
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          current_uses?: number | null
          discount_percentage: number
          id?: string
          max_uses?: number | null
          updated_at?: string | null
          valid_from: string
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          current_uses?: number | null
          discount_percentage?: number
          id?: string
          max_uses?: number | null
          updated_at?: string | null
          valid_from?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string
          id: string
          location: string | null
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date: string
          id?: string
          location?: string | null
          start_date: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string | null
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          amenities: string[] | null
          available_dates: unknown | null
          base_price: number
          bathrooms: number | null
          bedrooms: number | null
          cancellation_policy: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          instant_booking: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          max_guests: number | null
          price: number | null
          seasonal_pricing: Json | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amenities?: string[] | null
          available_dates?: unknown | null
          base_price?: number
          bathrooms?: number | null
          bedrooms?: number | null
          cancellation_policy?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          instant_booking?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_guests?: number | null
          price?: number | null
          seasonal_pricing?: Json | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amenities?: string[] | null
          available_dates?: unknown | null
          base_price?: number
          bathrooms?: number | null
          bedrooms?: number | null
          cancellation_policy?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          instant_booking?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_guests?: number | null
          price?: number | null
          seasonal_pricing?: Json | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      nested_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          story_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          story_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          story_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nested_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "nested_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nested_comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nested_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_posts: {
        Row: {
          author: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          related_story_id: string | null
          related_user_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          related_story_id?: string | null
          related_user_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          related_story_id?: string | null
          related_user_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_story_id_fkey"
            columns: ["related_story_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_user_id_fkey"
            columns: ["related_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      points_history: {
        Row: {
          booking_id: string | null
          created_at: string
          id: string
          points: number
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          id?: string
          points: number
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          id?: string
          points?: number
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "points_history_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "points_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_responses: {
        Row: {
          created_at: string
          id: string
          poll_id: string | null
          selected_option: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          poll_id?: string | null
          selected_option: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          poll_id?: string | null
          selected_option?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_responses_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          options: Json
          question: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          options: Json
          question: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          options?: Json
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          listing_id: string | null
          price: number
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          listing_id?: string | null
          price: number
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          listing_id?: string | null
          price?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_history_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          features: string[] | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          price_range: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          price_range?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          price_range?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          theme_preferences: Json | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          theme_preferences?: Json | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          theme_preferences?: Json | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      quiz_progress: {
        Row: {
          created_at: string
          id: string
          is_correct: boolean | null
          question_id: string | null
          selected_answer: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string | null
          selected_answer?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string | null
          selected_answer?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_progress_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          category: string
          correct_answer: string
          created_at: string
          id: string
          options: Json
          question: string
        }
        Insert: {
          category: string
          correct_answer: string
          created_at?: string
          id?: string
          options: Json
          question: string
        }
        Update: {
          category?: string
          correct_answer?: string
          created_at?: string
          id?: string
          options?: Json
          question?: string
        }
        Relationships: []
      }
      reading_history: {
        Row: {
          id: string
          read_at: string
          story_id: string
          user_id: string
        }
        Insert: {
          id?: string
          read_at?: string
          story_id: string
          user_id: string
        }
        Update: {
          id?: string
          read_at?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_history_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      repair_orders: {
        Row: {
          created_at: string | null
          customer_name: string
          device_type: string
          email: string
          estimated_cost_naira: number | null
          final_cost_naira: number | null
          id: string
          image_urls: string[] | null
          issue_description: string
          payment_provider:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_reference: string | null
          status: Database["public"]["Enums"]["repair_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_name: string
          device_type: string
          email: string
          estimated_cost_naira?: number | null
          final_cost_naira?: number | null
          id?: string
          image_urls?: string[] | null
          issue_description: string
          payment_provider?:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["repair_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_name?: string
          device_type?: string
          email?: string
          estimated_cost_naira?: number | null
          final_cost_naira?: number | null
          id?: string
          image_urls?: string[] | null
          issue_description?: string
          payment_provider?:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["repair_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          file_url: string | null
          id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          listing_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          listing_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string
          description: string | null
          discount_percentage: number | null
          id: string
          name: string
          points_required: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          id?: string
          name: string
          points_required: number
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          id?: string
          name?: string
          points_required?: number
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          service_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          service_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          service_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_inquiries_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_offered"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number
          home_service_fee_naira: number | null
          id: string
          image_url: string | null
          is_home_service_available: boolean | null
          name: string
          price_naira: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          home_service_fee_naira?: number | null
          id?: string
          image_url?: string | null
          is_home_service_available?: boolean | null
          name: string
          price_naira: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          home_service_fee_naira?: number | null
          id?: string
          image_url?: string | null
          is_home_service_available?: boolean | null
          name?: string
          price_naira?: number
        }
        Relationships: []
      }
      services_offered: {
        Row: {
          category_id: string | null
          created_at: string
          description: string
          features: string[] | null
          id: string
          image_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description: string
          features?: string[] | null
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string
          features?: string[] | null
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_offered_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      split_payments: {
        Row: {
          amount: number
          booking_payment_id: string | null
          created_at: string | null
          id: string
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_payment_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_payment_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "split_payments_booking_payment_id_fkey"
            columns: ["booking_payment_id"]
            isOneToOne: false
            referencedRelation: "booking_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "split_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      story_tags: {
        Row: {
          created_at: string
          story_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          story_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          story_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_tags_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          full_name: string
          id: string
          image_url: string | null
          order_index: number | null
          position: string
          qualifications: string[] | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          full_name: string
          id?: string
          image_url?: string | null
          order_index?: number | null
          position: string
          qualifications?: string[] | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          full_name?: string
          id?: string
          image_url?: string | null
          order_index?: number | null
          position?: string
          qualifications?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      telegram_users: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          telegram_id: number
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          telegram_id: number
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          telegram_id?: number
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      ton_wallets: {
        Row: {
          address: string | null
          balance: number | null
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          balance?: number | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          balance?: number | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ton_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "telegram_users"
            referencedColumns: ["id"]
          },
        ]
      }
      training_registrations: {
        Row: {
          additional_info: string | null
          course: string
          created_at: string | null
          education: string
          email: string
          experience: string
          id: string
          is_reviewed: boolean | null
          name: string
          phone: string
        }
        Insert: {
          additional_info?: string | null
          course: string
          created_at?: string | null
          education: string
          email: string
          experience: string
          id?: string
          is_reviewed?: boolean | null
          name: string
          phone: string
        }
        Update: {
          additional_info?: string | null
          course?: string
          created_at?: string | null
          education?: string
          email?: string
          experience?: string
          id?: string
          is_reviewed?: boolean | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: Database["public"]["Enums"]["transaction_status"] | null
          tx_hash: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          tx_hash?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          tx_hash?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "telegram_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "ton_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          is_super_admin: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_super_admin?: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_super_admin?: boolean | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      betting_stats: {
        Row: {
          lost_bets: number | null
          total_bets: number | null
          total_profit: number | null
          total_staked: number | null
          user_id: string | null
          win_rate: number | null
          won_bets: number | null
        }
        Relationships: []
      }
      winning_selections_analysis: {
        Row: {
          selection: string | null
          total_bets: number | null
          user_id: string | null
          win_rate: number | null
          wins: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      bet_status: "pending" | "won" | "lost" | "void"
      consultation_status: "pending" | "confirmed" | "cancelled" | "completed"
      content_type: "news" | "service" | "leader" | "testimonial" | "milestone"
      payment_provider: "stripe" | "paystack" | "flutterwave"
      repair_status:
        | "submitted"
        | "diagnosed"
        | "in_progress"
        | "ready"
        | "completed"
        | "cancelled"
      transaction_status: "pending" | "completed" | "failed"
      transaction_type: "deposit" | "withdrawal" | "transfer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
      bet_status: ["pending", "won", "lost", "void"],
      consultation_status: ["pending", "confirmed", "cancelled", "completed"],
      content_type: ["news", "service", "leader", "testimonial", "milestone"],
      payment_provider: ["stripe", "paystack", "flutterwave"],
      repair_status: [
        "submitted",
        "diagnosed",
        "in_progress",
        "ready",
        "completed",
        "cancelled",
      ],
      transaction_status: ["pending", "completed", "failed"],
      transaction_type: ["deposit", "withdrawal", "transfer"],
    },
  },
} as const
