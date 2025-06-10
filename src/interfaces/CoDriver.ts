export interface CoDriver {
  rickshawId: number;
  fullName: string;
  phoneNumber: string;
  yearOfBirth: number;
  descriptions: string;
  gender: string;
  imageUrl: string;
  imageFile?: File; 
}