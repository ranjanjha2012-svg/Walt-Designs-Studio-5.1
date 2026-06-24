export interface ServiceCard {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  priceEstimate: string;
  timeline: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyString: string;
  feedback: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  stats?: string;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}

export interface PlannerRequest {
  businessIdea: string;
  targetAudience: string;
  budgetRange: string;
  extraDetails?: string;
}

export interface PlannerStep {
  title: string;
  summary: string;
  actionItems: string[];
  recommendedWaltService: string;
  timeline: string;
}

export interface PlannerBlueprint {
  businessNameSuggestion: string;
  strategySummary: string;
  customSteps: PlannerStep[];
  estimatedTotalCost: string;
  timelineEstimate: string;
}
