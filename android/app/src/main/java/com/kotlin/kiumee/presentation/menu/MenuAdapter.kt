package com.kotlin.kiumee.presentation.menu

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemMenuBinding

class MenuAdapter(private val menuList: MutableList<Menu>) :
    RecyclerView.Adapter<MenuViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MenuViewHolder {
        val binding =
            ItemMenuBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return MenuViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MenuViewHolder, position: Int) {
        holder.bind(menuList[position])
    }

    override fun getItemCount(): Int {
        return menuList.size
    }
}
