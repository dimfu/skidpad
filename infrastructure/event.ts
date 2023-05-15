export interface Event {
  name: string
  location: string
  round: string
  startDate: string
  url: string
  schedule?: {
    id: number
    content: {
      time: string
      program: string
    }[]
  }[]
}
