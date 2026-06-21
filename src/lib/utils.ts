export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

export function clsx_merge(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

export function clsx(...inputs: ClassValue[]): string {
  let result = "";
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string") {
      result += (result ? " " : "") + input;
    } else if (Array.isArray(input)) {
      const inner = clsx(...input);
      if (inner) result += (result ? " " : "") + inner;
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) result += (result ? " " : "") + key;
      }
    }
  }
  return result;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

export function readingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getWhatsAppUrl(message?: string): string {
  const phone = "923224044150";
  const base = `https://wa.me/${phone}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}
