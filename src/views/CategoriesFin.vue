<template>
    <div>
        <div class="page-title">
            <h3>{{'Categories'| localize}}</h3>
        </div>
        <section>
            <LoaderComp v-if="loading"/>
            <div v-else class="row">
                
                    <CategoryCreate @created="addNewCategory"/>
                    <CategoryEdit
                     v-if="categories.length"
                     :categories="categories"
                     :key="categories.length + updateCount"
                     @updated="updateCategories"
                    />
                    <p v-else class="center">{{'Message_CategoryTitle'| localize}}</p>
            </div>
        </section>
    </div>

</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
    name: 'CategoriesFin',
    metaInfo() {
        return {
        title: this.$title('Menu_Categories')
        }
    },
    data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
    }), 
    async mounted() {
       this.categories = await this.$store.dispatch('fetchCategories')
       this.loading = false
    },
    components: {
        CategoryCreate, CategoryEdit
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category)
        },
        updateCategories(category) {
            const index = this.categories.findIndex(c => c.id === category.id)
            this.categories[index].title = category.title
            this.categories[index].limit = category.limit
            this.updateCount++
        }
    }
}
</script>