package com.kotlin.kiumee.presentation.menuselect

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.databinding.ItemMenuSelectBinding

class MenuSelectAdapter(private val menuSelectList: MutableList<MenuSelect>) :
    RecyclerView.Adapter<MenuSelectViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MenuSelectViewHolder {
        val binding =
            ItemMenuSelectBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return MenuSelectViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MenuSelectViewHolder, position: Int) {
        holder.bind(menuSelectList[position])
    }

    override fun getItemCount(): Int {
        return menuSelectList.size
    }
}
