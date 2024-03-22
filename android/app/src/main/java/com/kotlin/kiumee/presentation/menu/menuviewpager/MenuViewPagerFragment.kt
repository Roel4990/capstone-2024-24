package com.kotlin.kiumee.presentation.menu.menuviewpager

import android.os.Bundle
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentTabBinding
import com.kotlin.kiumee.presentation.menu.Menu
import com.kotlin.kiumee.presentation.menu.MenuActivity
import com.kotlin.kiumee.presentation.menu.MenuAdapter
import com.kotlin.kiumee.presentation.menu.MenuItemDecorator
import com.kotlin.kiumee.presentation.menu.cart.Cart

class MenuViewPagerFragment : BindingFragment<FragmentTabBinding>(R.layout.fragment_tab) {
    private var tabPosition: Int = 0

    override fun initView() {
        initFragmentInstance()
        initMenuViewPagerAdapter()
    }

    private fun initFragmentInstance() {
        arguments?.getInt(ARG_TAB_POSITION)?.let {
            tabPosition = it
        }
    }

    private fun initMenuViewPagerAdapter() {
        // 탭에 따른 데이터 설정
        val data = fetchDataForTab(tabPosition)
        binding.rvTab.adapter = MenuAdapter(click = { menu, position ->
            val newCartItem = Cart(menu.name, 1, menu.price)
            (activity as? MenuActivity)?.addCartItem(newCartItem)
        }).apply {
            submitList(data)
        }
        binding.rvTab.addItemDecoration(MenuItemDecorator(requireContext()))
    }

    private fun fetchDataForTab(tabPosition: Int): List<Menu> {
        // 탭에 따른 데이터를 가져와서 반환
        return when (tabPosition) {
            0 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "물",
                    0,
                    ""
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "숟가락",
                    0,
                    ""
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "젓가락",
                    0,
                    ""
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "앞접시",
                    0,
                    ""
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "국자",
                    0,
                    ""
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "집게",
                    0,
                    ""
                )
            )

            1 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "트리플 스테이크",
                    21000,
                    "부드러운 부챗살 스테이크, 메쉬 포테이토와 대파, 특제 와인소스의 세상에 없는 환상적인 조화"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "미도인 등심 스테이크",
                    19000,
                    "부드러운 등심 스테이크와 진한 육수로 우려낸 단호박 스프, 아지다마고의 한상차림"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "곱창 등심 스테이크",
                    16000,
                    "특제 소스로 12시간 지은 숙성한 소곱창과 부드러운 등심과의 특별한 조화"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "대창 부채 스테이크",
                    18000,
                    "대창과 부채살 스테이크의 과감하지만 멋진 콜라보"
                )
            )

            2 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "대창 덮밥",
                    12500,
                    "말이 필요없는 맛. 잘 손질된 대창을 매콤한 특제 양념과 불맛 나게 보깡낸 특별 덮밥"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "대창 큐브 스테이크 덮밥",
                    13000,
                    "스테이크와 대창을 함께 즐길 수 있는 미도인만의 특별한 콜라보 메뉴"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "화산 불백 덮밥",
                    11000,
                    "불맛 나는 돼지고기를 화산 모양으로 형상화한 비쥬얼 갑 강추 덮밥"
                )
            )

            3 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "미도인 곱창 라멘",
                    10500,
                    "부드러우면서 쫄깃한 곱창의 식감과 얼큰 시원한 미도인 만의 특별 라멘"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "청두 사천 탄탄멘",
                    10000,
                    "사천식으로 만든 매콤한 참깨돈골 육수와 매장에서 직접 만든 탄면장을 얹은 전통 탄탄멘"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "바질크림 새우 파스타",
                    10000,
                    "두근두근, 초록의 바지 페스토 크림 소스에 빠진 큼직한 새우와 베이컨칩의 환장 조합"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "새우 로제 생면 파스타",
                    10000,
                    "깔끔하고 부드러운 로제크림소스. 특제 스파이시와 탱글한 새우의 조화"
                )
            )

            4 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "미도인 곱창 떡볶이",
                    9500,
                    "미도인 총괄셰프의 매콤 특제소스, 소곱창과 쫄깃한 떡의 환상 하모니, 미도인 특별 곱떡 메뉴"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "미도인 우실장 떡볶이",
                    9000,
                    "미도인 총괄셰프의 특제소스와 삼겹살 대파가 듬뿍 들어간 약빤 메뉴"
                )
            )

            5 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "청포도 에이드",
                    7000,
                    "상큼한 청포도 에이드"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "복숭아 에이드",
                    7000,
                    "새콤달콤한 복숭아 에이드"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "망고 에이드",
                    7000,
                    "달달한 망고 에이드"
                )
            )

            6 -> listOf(
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "소주",
                    6000,
                    "참이슬, 처음처럼, 진로, 한라산"
                ),
                Menu(
                    "https://www.hecbob.com/img/page/brand/like_logo.png",
                    "맥주",
                    6000,
                    "카스, 테라, 캘리"
                )
            )

            else -> emptyList()
        }
    }

    companion object {
        private const val ARG_TAB_POSITION = "tab_position"

        fun newInstance(tabPosition: Int): MenuViewPagerFragment {
            val fragment = MenuViewPagerFragment()
            val args = Bundle()
            args.putInt(ARG_TAB_POSITION, tabPosition)
            fragment.arguments = args
            return fragment
        }
    }
}
