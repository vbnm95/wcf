export type PetType = "dog" | "cat" | "baby" | "all";

export type ProductCategory =
  | "유산균 케어"
  | "약효보호 케어"
  | "기능성 영양 케어"
  | "동물용의약품";

export type Product = {
  id: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  petTypes: PetType[];
  description: string;
  form: string;
  tags: string[];
  image?: string;
  badges: string[];
  recommendReasons: string[];
  feedingTip?: string;
  caution: string;
  detailUrl?: string;
};

export type QuestionOption = {
  label: string;
  value: string;
  next: string;
  iconImage?: string;
  helperText?: string;
};

export type QuestionNode = {
  id: string;
  type: "question";
  message: string;
  progress: number;
  options: QuestionOption[];
};

export type ResultNode = {
  id: string;
  type: "result";
  progress: number;
  careType: string;
  message: string;
  primaryProductId: string;
  secondaryProductIds: string[];
  caution?: string;
};

export type TreeNode = QuestionNode | ResultNode;

export type ChatMessage = {
  id: string;
  sender: "guide" | "user";
  text: string;
};
