package com.kotlin.kiumee.presentation.menu.cart

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import com.kotlin.kiumee.core.view.ItemDiffCallback
import com.kotlin.kiumee.databinding.ItemMenuCartBinding

class CartAdapter(private val onDeleteClickListener: (Cart) -> Unit) :
    ListAdapter<Cart, CartViewHolder>(CartAdapterDiffCallback) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): CartViewHolder {
        val binding =
            ItemMenuCartBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CartViewHolder(binding)
    }

    override fun onBindViewHolder(
        holder: CartViewHolder,
        position: Int
    ) {
        val cartItem = currentList[position]
        holder.bind(cartItem)
        holder.binding.ibItemMenuCartTrash.setOnClickListener {
            onDeleteClickListener.invoke(cartItem)
        }
    }

    companion object {
        private val CartAdapterDiffCallback =
            ItemDiffCallback<Cart>(
                // 추후 수정해야 함
                onItemsTheSame = { old, new -> old == new },
                onContentsTheSame = { old, new -> old == new }
            )
    }
}
