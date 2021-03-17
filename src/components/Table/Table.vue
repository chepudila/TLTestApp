<template>
    <div id="Table">
        <table>
            <thead>
                <tr>
                    <td v-bind:to="{query: {login:'1234'}}" v-for="(text, index) in tableHead" v-bind:key="index" v-on:click="setSort(text)">{{text}}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="element in showItems" v-bind:key="element.place">
                    <td v-for="(text, index) in element" v-bind:key="index">{{text}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        Фильтры
                    </td>
                    <td>
                        <input type="text" v-model="loginSearch" placeholder="логин"/>
                    </td>
                    <td>
                        <input type="number" v-model="fromSearch" placeholder="от"/>
                        <input type="number" v-model="toSearch" placeholder="до"/>
                    </td>
                    <td>
                        <select v-model="statusSearch" placeholder="статус">
                            <option value="">none</option>
                            <option v-for="(element, index) in arrStatus" v-bind:key="index">{{element}}</option>
                        </select>
                    </td>
                </tr>
            </tfoot>
        </table>
        <p>При клике по полю изменяется сортировка. Повторный клик меняет направление.</p>
    </div>
</template>>

<script>
    export default {
        name: 'Table',
        data () {
            return {
                query: {},
                loginSearch: '',
                statusSearch: '',
                sortField: '',
                order: '',
                fromSearch: undefined,
                toSearch: undefined,
                tableItems: [
                    {place: 1, login: "smith@gmail.com", ordersCount: 312, status: "Ценитель красоты"},
                    {place: 2, login: "lenin@gmail.com", ordersCount: 120, status: "Поставщик аксессуаров"},
                    {place: 3, login: "mask@gmail.com", ordersCount: 98, status: "Конкурент минздрава"},
                    {place: 4, login: "dog@mail.ru", ordersCount: 64, status: "рыбак"},
                    {place: 5, login: "nightmare@mail.ru", ordersCount: 34, status: "охотник"},
                    {place: 6, login: "cat@mail.ru", ordersCount: 1, status: "Ценитель красоты"},
                ],
                tableHead: ['Место', 'Логин', 'Подтвержденные заказы', 'Статус']
            }
        },
        computed: {
            showItems: function () {
                let tempItems = this.tableItems;

                if (this.loginSearch.length > 0) {
                    tempItems = tempItems.filter(tableItem => tableItem.login.toLowerCase().indexOf(this.loginSearch.toLowerCase()) !== -1);
                }

                if (this.statusSearch.length > 0) {
                    tempItems = tempItems.filter(tableItem => tableItem.status.toLowerCase().indexOf(this.statusSearch.toLowerCase()) !== -1);
                }

                if (this.fromSearch >= 0 && this.toSearch > 0) {
                    tempItems = tempItems.filter(tableItem => (this.fromSearch <= tableItem.ordersCount && tableItem.ordersCount <= this.toSearch));
                }

                if (this.sortField == 'Подтвержденные заказы') {
                    if (this.order == 'asc') {
                        tempItems.sort(function(a, b) {
                            return a.ordersCount - b.ordersCount;
                        });
                    } else {
                        tempItems.sort(function(a, b) {
                            return b.ordersCount - a.ordersCount;
                        });
                    }
                }

                if (this.sortField == 'Логин') {
                    if (this.order == 'asc') {
                        tempItems.sort(function(a, b) {
                            if (a.login > b.login) {
                                return 1;
                            }
                            if (a.login < b.login) {
                                return -1;
                            }
                            return 0;
                        });
                    } else {
                        tempItems.sort(function(a, b) {
                            if (a.login > b.login) {
                                return -1;
                            }
                            if (a.login < b.login) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                }

                if (this.sortField == 'Статус') {
                    if (this.order == 'asc') {
                        tempItems.sort(function(a, b) {
                            if (a.status > b.status) {
                                return 1;
                            }
                            if (a.status < b.status) {
                                return -1;
                            }
                            return 0;
                        });
                    } else {
                        tempItems.sort(function(a, b) {
                            if (a.status > b.status) {
                                return -1;
                            }
                            if (a.status < b.status) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                }

                if (this.sortField == 'Место') {
                    if (this.order == 'asc') {
                        tempItems.sort(function(a, b) {
                            return a.place - b.place;
                        });
                    } else {
                        tempItems.sort(function(a, b) {
                            return b.place - a.place;
                        });
                    }
                }

                return tempItems;
            },
            arrStatus: function () {
                let tempOptions = [];
                for (const element of this.showItems) {
                    if ( !tempOptions.find(index => index == element.status) ) {
                        tempOptions.push(element.status);
                    }
                }
                return tempOptions;
            },
        },
        watch: {
                loginSearch: function () {
                    this.query = Object.assign(this.query, { loginSearch: this.loginSearch });
                    this.$router.push({ query: this.query });
                },
                statusSearch: function () {
                    this.query = Object.assign(this.query, { statusSearch: this.statusSearch });
                    this.$router.push({ query: this.query });
                },
                fromSearch: function () {
                    this.query = Object.assign(this.query, { fromSearch: this.fromSearch });
                    this.$router.push({ query: this.query });
                },
                toSearch: function () {
                    this.query = Object.assign(this.query, { toSearch: this.toSearch });
                    this.$router.push({ query: this.query });
                },
        },
        methods: {
            setSort: function(sort) {
                this.sortField = sort;
                if (this.order == '' || this.order == 'desc') {
                    this.order = 'asc';
                    this.$route.params['order'];
                } else {
                    this.order = 'desc';
                }
                this.query = Object.assign(this.query, { sortField: this.sortField, order: this.order });
                this.$router.push({ query: this.query });
            },
        },
        created: function () {
            if (this.$route.query.sortField) {
                this.sortField = this.$route.query.sortField;
            }
            if (this.$route.query.order) {
                this.order = this.$route.query.order;
            }
            if (this.$route.query.loginSearch) {
                this.loginSearch = this.$route.query.loginSearch;
            }
            if (this.$route.query.statusSearch) {
                this.statusSearch = this.$route.query.statusSearch;
            }
            if (this.$route.query.fromSearch) {
                this.fromSearch = this.$route.query.fromSearch;
            }
            if (this.$route.query.toSearch) {
                this.toSearch = this.$route.query.toSearch;
            }
        },
    }
</script>

<style lang="scss" src="./Table.scss" scoped></style>