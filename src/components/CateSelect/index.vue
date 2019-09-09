<template>
    <section class="table-cate-select">
        <div
            v-for="cate in tableCategories"
            :key="cate.name"
            class="table-cate-select__cate"
        >
            <div
                class="table-cate-select__cate-view"
                :class="[cate.icon]"
                @click="addTable(cate)"
            />
            <p class="table-cate-select__cate-title">
                {{ cate.title }}
            </p>
        </div>
    </section>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import TABLE_CATEGORIES from '../../data/categories';

export default {
    name: 'TableCateSelect',

    data() {
        return {
            tableCategories: cloneDeep(TABLE_CATEGORIES),
            currCate: null,
        };
    },

    methods: {
        addTable(cate) {
            this.currCate = cate;
            this.$emit('add-element', cate.element);
            this.$emit('close');
        },
    },
};
</script>

<style lang="postcss">
.table-cate-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 392px;
    height: 188px;
    padding: 0 32px;
    border-radius: 4px;

    &__cate {
        width: 104px;

        &:hover {
            .table-cate-select__cate-view {
                border-color: var(--text-dis);
                background-color: rgba(68,73,80,0.16);
            }

            .table-cate-select__cate-title {
                color: var(--text-prim);
            }
        }
    }

    &__cate-view {
        width: 104px;
        height: 104px;
        padding: 23px 15px;
        background: #fff;
        border: 1px solid var(--panel-stroke);
        border-radius: 4px;
        cursor: pointer;
        background: #fff no-repeat no-repeat center / 74px 58px;
        transition: border-color .2s ease-in, background-color .2s ease-in;

        &.normal {
            background-image: url("~@/assets/table-icons/normal-1-2x.png");
        }

        &.checkbox {
            background-image: url("~@/assets/table-icons/checkbox-2-2x.png");
        }

        &.gradient {
            background-image: url("~@/assets/table-icons/gradient-0-2x.png");

        }
    }

    &__cate-icon {
        width: 100%;
        height: 100%;
    }

    &__cate-title {
        margin-top: 4px;
        color: var(--text-ter);
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        transition: color .2s ease-in;
    }
}
</style>
