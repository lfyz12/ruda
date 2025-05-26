export interface ITaskTimeLog {
    id: number
    userId: number
    ticketId: number
    start_time: Date
    end_time?: Date
}