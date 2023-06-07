export interface Event {
  slug: string
  name: string
  location: string
  round: string
  startDate: string
  url: string
  schedule: {
    started_at: string
    content: {
      time: string
      program: string
    }[]
  }[]
  timezone: string
}
