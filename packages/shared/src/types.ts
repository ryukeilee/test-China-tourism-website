// ============================================================
// ChinaVista Shared Types
// 前后端共享的类型定义
// ============================================================

// ------------------------ API Envelope ------------------------
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

// ------------------------ User ------------------------
export type MembershipTier = "V1" | "V2" | "V3" | "V4" | "V5" | "SVIP";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  locale: Locale;
  membershipTier: MembershipTier;
  points: number;
  createdAt: string;
  updatedAt: string;
}

// ------------------------ Location / Scenic ------------------------
export interface ScenicSpot {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  province: string;
  city: string;
  description: string;
  images: string[];
  videoUrl?: string;
  ticketPrice: number;
  openingHours: string;
  bestSeasons: string[];
  tips: string;
  rating: number;
  reviewCount: number;
  aiSummary?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  facilities: ScenicFacility[];
}

export interface ScenicFacility {
  type: "entrance" | "parking" | "restaurant" | "restroom" | "visitor_center";
  name: string;
  coordinates: { lat: number; lng: number };
}

// ------------------------ Hotel ------------------------
export type HotelCategory = "5star" | "4star" | "3star" | "boutique" | "hostel";

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  category: HotelCategory;
  city: string;
  province: string;
  images: string[];
  vrTourUrl?: string;
  rooms: Room[];
  amenities: HotelAmenity[];
  rating: number;
  reviewCount: number;
  priceRange: { min: number; max: number };
}

export interface Room {
  id: string;
  name: string;
  price: number;
  bedType: string;
  maxGuests: number;
  available: boolean;
}

export type HotelAmenity = "wifi" | "breakfast" | "parking" | "pool" | "gym" | "spa";

// ------------------------ Transport ------------------------
export type FlightType = "one-way" | "round-trip" | "multi-city";

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { city: string; airport: string; time: string };
  arrival: { city: string; airport: string; time: string };
  price: number;
  stops: number;
  duration: number; // minutes
}

export interface TrainTicket {
  id: string;
  trainNumber: string;
  type: "G" | "D" | "C" | "K" | "T" | "Z";
  departure: { station: string; time: string };
  arrival: { station: string; time: string };
  seats: TrainSeat[];
}

export interface TrainSeat {
  type: "business" | "first" | "second" | "standing";
  price: number;
  available: number;
}

export type CarCategory = "economy" | "business" | "suv" | "luxury";

// ------------------------ AI / LLM ------------------------
export interface TravelPlanRequest {
  budget: number;
  travelers: number;
  origin: string;
  preferences: string[];
  duration: number; // days
  startDate?: string;
}

export interface TravelPlan {
  itinerary: DayPlan[];
  hotels: Hotel[];
  attractions: ScenicSpot[];
  weather: WeatherForecast[];
  budget: BudgetBreakdown;
  transport: TransportRoute[];
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  meals: Meal[];
  accommodation: string;
}

export interface Activity {
  name: string;
  type: "sightseeing" | "dining" | "shopping" | "transport" | "rest";
  duration: number; // minutes
  notes: string;
}

export interface Meal {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  recommendation: string;
  estimatedCost: number;
}

export interface BudgetBreakdown {
  total: number;
  transport: number;
  accommodation: number;
  dining: number;
  attractions: number;
  other: number;
}

export interface TransportRoute {
  from: string;
  to: string;
  mode: "flight" | "train" | "bus" | "car" | "walk";
  duration: number;
  cost: number;
  bookingUrl?: string;
}

// ------------------------ Weather ------------------------
export interface WeatherForecast {
  date: string;
  temperature: { high: number; low: number };
  condition: WeatherCondition;
  windSpeed: number;
  uvIndex: number;
  precipitationProbability: number;
}

export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "snowy"
  | "stormy"
  | "foggy"
  | "partly_cloudy";

// ------------------------ Community ------------------------
export interface TravelPost {
  id: string;
  author: User;
  title: string;
  content: string;
  images: string[];
  videoUrl?: string;
  likes: number;
  bookmarks: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

// ------------------------ i18n ------------------------
export type Locale = "zh" | "en" | "ja" | "ko" | "fr";

// ------------------------ Payment ------------------------
export type PaymentProvider = "wechat" | "alipay" | "unionpay" | "applepay";
export type OrderStatus = "pending" | "paid" | "completed" | "refunded" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentProvider: PaymentProvider;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  type: "hotel" | "flight" | "train" | "scenic" | "car_rental";
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
