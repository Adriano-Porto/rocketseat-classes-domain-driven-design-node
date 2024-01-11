import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswersRespository } from "@/domain/forum/application/respositories/answers-repository"
import { Answer } from "../../enterprise/entities/answer"
import { Either, right } from "@/core/either"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"

interface AnswerQuestionUseCaseInput {
    instructorId: string,
    questionId: string,
    content: string,
    attachmentsIds: string[],
}

type AnswerQuestionUseCaseOutput = Either<null, {
    answer: Answer
}>

export class AnswerQuestionUseCase {
    constructor(
        private answersRepository: AnswersRespository
            
    ) {}

    async execute({
        instructorId,
        questionId,
        content,
        attachmentsIds
    }: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput>{
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id
            })
        })
        
        answer.attachments = new AnswerAttachmentList(answerAttachments)

        await this.answersRepository.create(answer)

        return right({ answer })
    }
}