import { QuestionsRespository } from "@/domain/forum/application/respositories/questions-repository"
import { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements QuestionsRespository {
    public items: Question[] = []
    
    async create(question: Question) {
        this.items.push(question)
    }
    
    async save(question: Question) {
        const itemIndex = this.items.findIndex((item) => item.id === question.id)
        this.items[itemIndex] = question
    }

    async delete(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === question.id)
        this.items.splice(itemIndex, 1)
    }
    async findById(id: string): Promise<Question | null> {
        const question = this.items.find(item => item.id.toString() === id)
        if (!question) return null

        return question
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.items.find(item => item.slug.value === slug)

        if(!question) return null
        
        return question
    }

}