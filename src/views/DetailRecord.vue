<template>
<div>
  <LoaderComp v-if="loading"/>

  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{'Menu_History'|localize}}</router-link>
      <a @click.prevent class="breadcrumb">
        {{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div 
        :class="{
          'green': record.type === 'income',
          'red': record.type === 'outcome'
        }"
        class="card"
        >
          <div class="card-content white-text">
            <p>{{'Description'|localize}}: {{record.description}}</p>
            <p>{{'Amount'|localize}}: {{record.amount | currency}}</p>
            <p>{{'Category'|localize}}: {{record.categoryName}}</p>

            <small>{{record.date | date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="center" v-else>Записи c id ={{$route.params.id}} не существует</p>
</div>

</template>

<script>
import LoaderComp from '@/components/app/LoaderComp.vue'
export default {
    name: "detailFin",
    metaInfo() {
        return {
        title: this.$title('Detail_Title')
        }
    },
    data: () => ({
        record: null,
        loading: true
    }),
    async mounted() {
        const id = this.$route.params.id
        const record = await this.$store.dispatch("fetchRecordById", id)
        const category = await this.$store.dispatch("fetchCategoryById", record.categoryId)
        this.record = {
            ...record,
            categoryName: category.title
        }
        this.loading = false

      
    },
    components: { LoaderComp }
}
</script>