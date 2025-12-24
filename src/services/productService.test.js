import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProductsService } from "./productService";
import api from "../config/api";

// Mock the API module
vi.mock("../config/api");

describe("productService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch products successfully", async () => {
    const mockProducts = [
      { _id: "1", name: "Product 1" },
      { _id: "2", name: "Product 2" },
    ];

    // Mock API response
    api.get.mockResolvedValue({ data: mockProducts });

    const result = await getProductsService();

    expect(api.get).toHaveBeenCalledWith("/products", { params: undefined });
    expect(result).toEqual(mockProducts);
  });

  it("should pass parameters correctly", async () => {
    const params = { category: "ofertas" };
    api.get.mockResolvedValue({ data: [] });

    await getProductsService(params);

    expect(api.get).toHaveBeenCalledWith("/products", { params });
  });

  it("should throw error when API fails", async () => {
    const mockError = new Error("Network error");
    api.get.mockRejectedValue(mockError);

    await expect(getProductsService()).rejects.toThrow("Network error");
  });
});
