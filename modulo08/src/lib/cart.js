const { formatPrice } = require('./utils')

//carrinho ficar guardado na sessao (req.session)

const Cart = {
    init(oldCart) {
        if (oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }
        return this
    },
    addOne(product) {
        try {
            //ver se o produto já existe no carrinho
            let inCart = this.getCartItem(product.id)

            //se não existe, deve ser adicionado ao carrinho
            if (!inCart) {
                inCart = {
                    product: {
                        ...product,
                        formattedPrice: formatPrice(product.price)
                    },
                    quantity: 0,
                    price: 0,
                    formattedPrice: formatPrice(0)
                }
                this.items.push(inCart)
            }

            //excedeu a quantidade maxima
            if (inCart.quantity >= product.quantity) return this

            //atualiza item do carrinho
            inCart.quantity++
            inCart.price = inCart.product.price * inCart.quantity
            inCart.formattedPrice = formatPrice(inCart.price)

            //atualiza o carrinho
            this.total.quantity++
            this.total.price += inCart.product.price
            this.total.formattedPrice = formatPrice(this.total.price)

            return this
        } catch (error) {
            console.error(err)
        }
    },
    removeOne(productId) {
        try {
            //pegar o item do carrinho
            const inCart = this.getCartItem(productId)

            if (!inCart) return this

            //caso exista atualizar o item
            inCart.quantity--
            inCart.price = inCart.product.price * inCart.quantity
            inCart.formattedPrice = formatPrice(inCart.price)

            //atualizar o carrinho
            this.total.quantity--
            this.total.price -= inCart.product.price
            this.total.formattedPrice = formatPrice(this.total.price)

            if(inCart.quantity < 1 ){
                this.items = this.items.filter( item =>
                    item.product.id != inCart.product.id)
                
                return this
            }

            return this

        } catch (error) {
            console.error(error)
        }
    },
    delete(productId) {
        try {
            const inCart = this.getCartItem(productId)

            if( !inCart ) return this

            if(this.items.length > 0 ){
                this.total.quantity -= inCart.quantity
                this.total.price -= (inCart.product.price * inCart.quantity)
                this.total.formattedPrice = formatPrice(this.total.price)

                //return this
            }

            this.items = this.items.filter(item => inCart.product.id != item.product.id)
            return this


        } catch (error) {
            console.error(error)            
        }
    },
    getCartItem(productId){
        try {
            return this.items.find(item => item.product.id == productId)            
        } catch (error) {
            console.error(error)            
        }
    }

}

module.exports = Cart
//adicionar 1 item ao carrinho
//remover 4 item do carrinho
//deleter todo o item