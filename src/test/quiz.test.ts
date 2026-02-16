import { describe, expect, it } from "vitest";
import {
  QUIZ_QUESTIONS_COUNT,
  QUIZ_QUESTIONS_POOL,
  getRandomQuestions,
} from "@/data/quiz";

describe("quiz question selection", () => {
  it("returns the default configured number of questions", () => {
    const questions = getRandomQuestions();
    expect(questions).toHaveLength(QUIZ_QUESTIONS_COUNT);
  });

  it("returns unique questions with IDs from the source pool", () => {
    const questions = getRandomQuestions();
    const ids = questions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    const sourceIds = new Set(QUIZ_QUESTIONS_POOL.map((q) => q.id));

    expect(uniqueIds.size).toBe(questions.length);
    expect(ids.every((id) => sourceIds.has(id))).toBe(true);
  });

  it("returns all questions when requested count exceeds pool size", () => {
    const questions = getRandomQuestions(QUIZ_QUESTIONS_POOL.length + 50);
    expect(questions).toHaveLength(QUIZ_QUESTIONS_POOL.length);
  });
});
