package com.kotlin.kiumee.presentation.menu.cart

import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemMenuCartBinding

class CartViewHolder(val binding: ItemMenuCartBinding) :
    RecyclerView.ViewHolder(binding.root) {
    fun bind(data: CartEntity) {
        with(binding) {
            tvItemMenuCartName.text = data.name
            tvItemMenuCartCount.text = "수량 : ${data.count}"
            tvItemMenuCartPrice.text = "가격 : ${data.price}원"
        }
    }
}
