import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import { wotThemeOptionsKey } from '../options.js'

export type TeamMember = {
  avatar: string
  name: string
  title: string
  tags?: string[]
  desc?: string
  github?: string
  twitter?: string
}

type TeamMemberPayload = TeamMember & {
  status?: string
}

const data = ref<TeamMember[]>([])

export function useTeam() {
  const options = inject(wotThemeOptionsKey)
  const teamOptions = options?.team

  onMounted(async () => {
    if (!teamOptions || data.value.length) {
      return
    }

    const urls = teamOptions.urls || []

    const MOCK_MEMBERS: TeamMember[] = []

    const normalizeMembers = (members: TeamMemberPayload[]): TeamMember[] => {
      return members.map((member) => {
        const tags = Array.isArray(member.tags) ? member.tags : member.status ? [member.status] : []

        return {
          avatar: member.avatar,
          name: member.name,
          title: member.title,
          tags,
          desc: member.desc,
          github: member.github,
          twitter: member.twitter
        }
      })
    }

    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '/team.json?t=' + Date.now(), {
            timeout: 5000
          })
          const members: TeamMemberPayload[] = response.data && response.data.members ? response.data.members : []
          return normalizeMembers(members)
        } catch (error) {
          console.warn(`Failed to fetch team from ${url}`)
        }
      }
      return normalizeMembers(MOCK_MEMBERS)
    }

    data.value = await fetchData()
  })

  return { data }
}
