import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { QuestionsRespository } from "../respositories/questions-repository"

interface CreateQuestionUseCaseInput {
    authorId: string,
    title: string,
    content: string,
}

interface CreateQuestionUseCaseOutput {
    question: Question
}

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionsRespository) {}

    async execute({
        authorId,
        title,
        content
    }: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content
        })

        await this.questionsRepository.create(question)

        return { question}
    }
}