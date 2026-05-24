import { recommendationTree } from "@/data/recommendationTree";
import { getProductById } from "@/data/products";
import type { Product, TreeNode } from "@/types";

export function getTreeNode(id: string): TreeNode {
  return recommendationTree[id] ?? recommendationTree.start;
}

export function getResultProducts(primaryProductId: string, secondaryProductIds: string[]) {
  const primaryProduct = getProductById(primaryProductId);
  const secondaryProducts = secondaryProductIds
    .map((id) => getProductById(id))
    .filter((product): product is Product => Boolean(product));

  return { primaryProduct, secondaryProducts };
}

export function getInitialGuideMessage() {
  const startNode = getTreeNode("start");
  return startNode.type === "question" ? startNode.message : "";
}
