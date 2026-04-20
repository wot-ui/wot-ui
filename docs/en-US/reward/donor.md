# Donor List

Thank you to all donors for your support of this project. The following list is in chronological order, not ranked.

:::tip Reminder
After donating, you can send an email to 1780903673@qq.com or notify us through social platforms like GitHub or WeChat groups about the donor name, message, and link you would like to display (the link can be your blog, GitHub, personal website, company product, etc.). If possible, please be sure to leave your GitHub username.
:::

## Donor List

<table v-if="data&&data.donor">
  <thead>
    <tr>
      <th>Donor</th>
      <th>Message</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(donor,index) in data.donor">
      <td>{{donor.name}}</td>
      <td>{{donor.message}}</td>
      <td>
          <el-link v-if="donor.link!=='-'" :href="donor.link" target="_blank">{{donor.link}}</el-link>
          <span v-else>-</span>
      </td>
    </tr>
  </tbody>
</table>

:beers::beers::beers: Thank you again to all donors for your support. We also welcome your suggestions and feedback. :beers::beers::beers:

<script setup>
import { useSponsor } from '@wot-ui/vitepress-theme'
const { data } = useSponsor()
</script>
