package com.kotlin.kiumee.presentation.form

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.kotlin.kiumee.R

class FormAdapter(
    private val context: Context,
    private val storeList: MutableList<Store>
) : BaseAdapter() {
    var onItemClick: ((store: Store) -> Unit)? = null

    override fun getCount(): Int {
        return storeList.size
    }

    override fun getItem(position: Int): Any {
        return storeList[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var convertView = convertView
        if (convertView == null) convertView =
            LayoutInflater.from(parent?.context).inflate(R.layout.item_form_store, parent, false)

        val item: Store = storeList[position]

        val storeImage = convertView?.findViewById<View>(R.id.iv_item_form_store) as ImageView
        val storeName = convertView?.findViewById<View>(R.id.tv_item_form_store_name) as TextView
        val storeDescription =
            convertView?.findViewById<View>(R.id.tv_item_form_store_description) as TextView

        Glide.with(context).load(item.imageUrl).into(storeImage)
        storeName.text = item.name
        storeDescription.text = item.description

        convertView.setOnClickListener {
            onItemClick?.invoke(item)
        }

        return convertView
    }
}
