from app.models import db, Post
import random
from faker import Faker

fake = Faker()

# https://picsum.photos/400/600
# https://picsum.photos/600/400
# https://picsum.photos/600

post_pictures = [
    'https://i.picsum.photos/id/173/400/600.jpg?hmac=Bq5JLYxPIoXJT4NYMg2_I2l_3BiizDt44mUw8XOymb4',
    'https://i.picsum.photos/id/508/400/600.jpg?hmac=qT15ALwu4wJr31mpnyjX755VXLvxe3GYxMtNG6R-Cuo',
    'https://i.picsum.photos/id/84/400/600.jpg?hmac=ziP8Wcw7r8D9J9Ql8uSm21CE8w-27kcCC1rE8wojyK0',
    'https://i.picsum.photos/id/530/400/600.jpg?hmac=FyjCe8z9OHG1SM9Ui9ZblYzgRojfs_w-9ms_GsIWQGI',
    'https://i.picsum.photos/id/682/400/600.jpg?hmac=UIcteWk_dEQXpOlw5lFB-6kAeTZQHgEzoSEeEhjqzY8',
    'https://i.picsum.photos/id/667/400/600.jpg?hmac=K1HDaeZJGSBq80y4379AZh7ro94VA-TSIJqvPAKes7g',
    'https://i.picsum.photos/id/929/400/600.jpg?hmac=1nlUusN2UINLeRyg5QY9kxorn35pabELuBQn1UwVMW0',
    'https://i.picsum.photos/id/729/400/600.jpg?hmac=rygX8Gs7ky44F0Sa4zo924dXOgdw-bDxdwI5gNrLzKc',
    'https://i.picsum.photos/id/640/400/600.jpg?hmac=bqNys_61y6IjuPTyn-mgPcxq0Uohzsz09QNOzbi_IXs',
    'https://i.picsum.photos/id/2/400/600.jpg?hmac=_Sgz_MtbuV5f-GDv1Gtdpm6sjHLKXbqXVpkR72bIpRQ',
    'https://i.picsum.photos/id/687/400/600.jpg?hmac=tl1eMWtA7IbipTNbdtAYvkq_cOw635BZ5DzpbuPiTDI',
    'https://i.picsum.photos/id/803/400/600.jpg?hmac=0N6B_KgA2N1O9f-_3ZbN81DJV3lYlzfCDZ45bmSruko',
    'https://i.picsum.photos/id/1003/400/600.jpg?hmac=GpsVsDNGCq3w7sURelNeXjnD9f28dhHqIl0siJLGioc',
    'https://i.picsum.photos/id/581/400/600.jpg?hmac=-UGpk9M2rQoR-VZWM9RPt-YJfylWeVymjviphoz1KmY',
    'https://i.picsum.photos/id/108/400/600.jpg?hmac=mXrwl4QqgGLI_qOaImLMbJ5_onUBQGP6h688JTgERRg',
    'https://i.picsum.photos/id/435/400/600.jpg?hmac=E0tRhHjK3OBvaj22QKbkOHagt0Xir6X_uP1l8h-m1UE',
    'https://i.picsum.photos/id/362/400/600.jpg?hmac=nDr8r0DCRK9hwQwz_nEKEukqpmqYydOtZ5MBTRQBT4E',
    'https://i.picsum.photos/id/549/400/600.jpg?hmac=sf8vDYtK7mHc0IJ6M_Vs3vYzWXHUk6o4iNia73qg6gw',
    'https://i.picsum.photos/id/657/400/600.jpg?hmac=eCOxzxVCKHC6DOvUvsSLf6BYkO0SS8oFJm1bvU21HYo',
    'https://i.picsum.photos/id/969/400/600.jpg?hmac=5_JDcOug4oM875H3Y0FEwbXwitipuEtYdipurhxy58g',
    'https://i.picsum.photos/id/472/400/600.jpg?hmac=pDculbb5J0wOSyz9LvgoKbFsvLZv7zs54pDJSVgVgck',
    'https://i.picsum.photos/id/987/400/600.jpg?hmac=5sBhbkTQLSo4hZDJ3l0UCYjdg6GD-PjQgTu829TbQ3I',
    'https://i.picsum.photos/id/985/400/600.jpg?hmac=zsyh9KZk2F9AaZRCYj4mfqcOrfvyi3RDMov2ZKnYg_w',
    'https://i.picsum.photos/id/373/400/600.jpg?hmac=ylsZPBC2Cy42PnWRnQ4igwlPTqVlhx5qjMvZAYqFYZw',
    'https://i.picsum.photos/id/374/400/600.jpg?hmac=WUWnQrKmigtqVybKQ8fduYWsfhfyFV565EeVnBL8f3U',
    'https://i.picsum.photos/id/871/600/400.jpg?hmac=Eci-lMGI-CFwpv1DjagFyWfFo3qZ6bN0n9J6V7uUmh0',
    'https://i.picsum.photos/id/554/600/400.jpg?hmac=ym0V0vQ_Oe4Jv28cp2H4hT4_nUI7t4guFm0ZUtCPZlc',
    'https://i.picsum.photos/id/528/600/400.jpg?hmac=eFbP1lOwnSj2og9JptMnl4XDMN5GRE-W6iiZ2S2-O-A',
    'https://i.picsum.photos/id/901/600/400.jpg?hmac=dlTbPeNOqTtAgppFDWgEkQkZGGr9R5zXciM-nS0yGdU',
    'https://i.picsum.photos/id/972/600/400.jpg?hmac=soV4z3v_MUQdxXfWnWnK5P9mMUep_xMan9NyHhiwQms',
    'https://i.picsum.photos/id/696/600/400.jpg?hmac=X0pmSeuhwRTv9Ia1G7MW-4zRTU6fZz7MtCfgpc1Fc4U',
    'https://i.picsum.photos/id/129/600/400.jpg?hmac=NsxhinMkbblm7RqaAxfzA_jGZMeZLkv9VNNJuO9Swdw',
    'https://i.picsum.photos/id/80/600/400.jpg?hmac=X57OWd9qdzzw2qXnXqlkatCj3I7UJCLjCbab8C7m5bM',
    'https://i.picsum.photos/id/783/600/400.jpg?hmac=NYZ91Nyusw1u8Vr96xKp-hAKDGZ7Z1mf-PKVggxK7Vg',
    'https://i.picsum.photos/id/996/600/400.jpg?hmac=4RlqCbTo1pYBvF8QFCoAD9PJAzmrxKSbHgMdm2z_MLA',
    'https://i.picsum.photos/id/661/600/400.jpg?hmac=F8MCz3Hkz4ut-uiJAxwkkqJ91GZVKLk4A-qfLM9kJ_8',
    'https://i.picsum.photos/id/188/600/400.jpg?hmac=1CLel2OpoSS5--5rMF8RTsOOaGjBTEVuFDPaFa3uO3o',
    'https://i.picsum.photos/id/173/600/400.jpg?hmac=ftFETwZpHOiX1KdoUNqt3fclh0rIPfd1D6M3nFC8gvM',
    'https://i.picsum.photos/id/301/600/400.jpg?hmac=o1gV59X87tDpEwAq9837KU8htA3XSKYH1xYhWPa-3j8',
    'https://i.picsum.photos/id/704/600/400.jpg?hmac=PE-tQxeuIgN3YxsJuV9Vb-ZYcvRc4vN1ttBg21RiPC0',
    'https://i.picsum.photos/id/240/600/400.jpg?hmac=lG7dqxzNYqxZm9To7aZWFBIJxTxnIo1uponx0GWLE8o',
    'https://i.picsum.photos/id/164/600/400.jpg?hmac=AeaV1BoMa0SBprKJm71cmlXO7mUuDsQU5t-n-xUZlus',
    'https://i.picsum.photos/id/442/600/400.jpg?hmac=iykN2ZQr7Zo76k4-OeMFdg2FYt_heeo2zefQryqyJI4',
    'https://i.picsum.photos/id/468/600/400.jpg?hmac=C0ppwhkj2oT7Dju89T9CE1N3E0SlArBygkrlT_DSqsU',
    'https://i.picsum.photos/id/1022/600/400.jpg?hmac=blXYX3sDF31GHM_b4Z1Ibyb8tmyihlk_k93SOXOX0og',
    'https://i.picsum.photos/id/682/600/400.jpg?hmac=vFWUiS2fv_4qqvyMCjc9CrP9YmvMAB7VgngCRgmX4Yk',
    'https://i.picsum.photos/id/420/600/400.jpg?hmac=adpnzFQ10Qsrp1Sk1Xh7MMpM7jHwrI1s6PEhKY12QJo',
    'https://i.picsum.photos/id/1059/600/400.jpg?hmac=H_g_vDVHIdFlCe87jt5hLo2axio1nxFSYi72o1Nb4rA',
    'https://i.picsum.photos/id/577/600/400.jpg?hmac=LqfEcnwmNotfPYBZLT-7rBDNhFojFxo0-YGdm1SIpmQ',
    'https://i.picsum.photos/id/596/600/400.jpg?hmac=gH3VooRuZMV4VaGWJoJ6Im-hwoR3lS6y4L-ZI-F_3oU',
    'https://i.picsum.photos/id/327/600/600.jpg?hmac=RcHmcbeySv3VoE34oXBr3lloN-3rZI9N4PfxTj2q2tc',
    'https://i.picsum.photos/id/418/600/600.jpg?hmac=1Dpm8Q0zubygWKd959YJV2dnr-2CK3c4mTHZ8ERU04A',
    'https://i.picsum.photos/id/274/600/600.jpg?hmac=5AeUXVZYOX5sKaXZfjy5rs9eaoSQXhJH-JBr4DavtxY',
    'https://i.picsum.photos/id/837/600/600.jpg?hmac=1NEsGpF2l8nfRG4Daz3oVeiGjVc2tC4ZdttYzH5-a70',
    'https://i.picsum.photos/id/433/600/600.jpg?hmac=BrRlbMmSPoe2_t9Qi3zRim62UFIGp1yZdxmTawVQkE4',
    'https://i.picsum.photos/id/818/600/600.jpg?hmac=pE_uXKEEs5SISKER8kAwJhPwwVvgGCAsPBUuR5Ub_ds',
    'https://i.picsum.photos/id/957/600/600.jpg?hmac=NwoTHvxirt1-MS-B4JL_UpLJIUr6qde7r17B7Ukq1Cc',
    'https://i.picsum.photos/id/594/600/600.jpg?hmac=v6ZK6kB0Gyd2wWPvCxXj_8OvOykZRyTLgUp0E1ryA-Q',
    'https://i.picsum.photos/id/12/600/600.jpg?hmac=ZnYsryFhyhqABDyiKltWWFSti41M-vSyHViXcwQmyRo',
    'https://i.picsum.photos/id/292/600/600.jpg?hmac=Z2D7YOl9eRV8wuKNrAkzjGx42W1NibMvgtcKfXyGcpI',
    'https://i.picsum.photos/id/814/600/600.jpg?hmac=UIIAlnyJkLpAjeePtiYHhfzSheBJt3Bejxp6MPHEuxg',
    'https://i.picsum.photos/id/253/600/600.jpg?hmac=hburOwKHaBLm-XvvskrZNqvBxW4_KiPVo0Z8X3IrXq0',
    'https://i.picsum.photos/id/328/600/600.jpg?hmac=Mgtp8fRV2QsFB_tEF0Z_oUoQXmva7qsdzJi3f8JE0fg',
    'https://i.picsum.photos/id/465/600/600.jpg?hmac=k4XRCMN9PEd_nnmA5G1QzQ8Rt9UpxMqfpPlS1qNvNZk',
    'https://i.picsum.photos/id/995/600/600.jpg?hmac=9l_D9Yc1GBFz_p54WRh5ndSchFugayc4Ioi051niXRw',
    'https://i.picsum.photos/id/347/600/600.jpg?hmac=_fsmxTXkrC_0vcS5U9k4Av7ABsyjwwijwjOQSMwRq0I',
    'https://i.picsum.photos/id/125/600/600.jpg?hmac=XHzCl2yJwKW0-BXzxmwVHtgIZkwc9Zf1O4jzCknzc3Y',
    'https://i.picsum.photos/id/974/600/600.jpg?hmac=3uc-RdHqWrmLdAHOHextU7-LaljxKszlzasvUHHumMQ',
    'https://i.picsum.photos/id/506/600/600.jpg?hmac=cRpJ2iYeLN77-3VobbIvI_tc_-L9VHwDzQ9C5yBFOu8',
    'https://i.picsum.photos/id/650/600/600.jpg?hmac=P5FAgQKYHIuhuUmObY3DOz19WrSdM0-mNe5ki8pYS7s',
    'https://i.picsum.photos/id/824/600/600.jpg?hmac=TGKdYU_Ke1F5dAGpvVon6YT5Sz99aiC6rRpFZ09aiRw',
    'https://i.picsum.photos/id/526/600/600.jpg?hmac=kkmHUm2cFxCADzLfOUIRWt2RSnHJR5w05xMMmm26cys',
    'https://i.picsum.photos/id/616/600/600.jpg?hmac=a4_b6kRAmNaG67v1qvTmKYYyPSLzCobqd5PjUg_srXg',
    'https://i.picsum.photos/id/842/600/600.jpg?hmac=xpS8Snrlr6C8Daje2yeYe43QAvjnGQF5eudV44EXGKY',
    'https://i.picsum.photos/id/567/600/600.jpg?hmac=vECelt4hHPixkpHgyYtNftjxvVcP2vT3BfwUdveoSF0',
    'https://i.picsum.photos/id/816/600/600.jpg?hmac=pY37WsBvbht8MIgqO1vvzxKV3-5deuY4ZtF1NX_yOK8',
    'https://i.picsum.photos/id/612/600/600.jpg?hmac=OOkE5Q9AbaUpjesuVwaU6diL0WTpH5UC-vUwZNA0uT8',
    'https://i.picsum.photos/id/272/600/600.jpg?hmac=J_MRc1LSE82kgwpolCCkF8ZSEZDzrTqU5N5wiJQ8rsQ',
    'https://i.picsum.photos/id/375/600/600.jpg?hmac=nxCz_ZsTIgGOG-txF1MKgE2Bs-i12OFyvBD9djH-lHQ',
    'https://i.picsum.photos/id/527/600/600.jpg?hmac=t2NSFS0PeRnu_ILKZVHAi6gxXZWTyvsvG6ApH8WWFdI',
    'https://i.picsum.photos/id/274/600/600.jpg?hmac=5AeUXVZYOX5sKaXZfjy5rs9eaoSQXhJH-JBr4DavtxY',
    'https://i.picsum.photos/id/1048/600/600.jpg?hmac=OV4CqmVsJQPQaFuGjP8J6OfcRNse3neaNocChV6yLUU',
    'https://i.picsum.photos/id/46/600/600.jpg?hmac=tG6ilQ60EdSMY2S99fw-DxWaRO1eL4WoAPT72dLdoeQ',
    'https://i.picsum.photos/id/662/600/600.jpg?hmac=4E7vM7tlYrTvrWcd0_gmVHbMbNAAwzrnfqKpD5I8HFM',
    'https://i.picsum.photos/id/260/600/600.jpg?hmac=5QP9_gpfjT5YEKxN0TXrzW71POOKqBnJDHo07dx9Lgg',
    'https://i.picsum.photos/id/704/600/600.jpg?hmac=v8XEqnoZUYx1prpFYSxD2bZNGJUl-RYiKyJk3CP54Hw',
    'https://i.picsum.photos/id/811/600/600.jpg?hmac=lDGvxVqZTph2jrgdI-9h2jdnzSK_zWKixVx8ay6E6wE',
    'https://i.picsum.photos/id/896/600/600.jpg?hmac=Wq1oWSmP86R1o9b5kEmaUldvNKpz1HH_f1aZsN00b74',
    'https://i.picsum.photos/id/835/600/600.jpg?hmac=ExJqcXeiqUZH7eZOGz7KHVJNCIvj9ne1jACoQFk7dsE',
    'https://i.picsum.photos/id/504/600/600.jpg?hmac=8PjIqVUS8HTj2LXiFmTyENGerLlisWJqREkmq686c0U',
    'https://i.picsum.photos/id/943/600/600.jpg?hmac=IbrSSHtdGtVHReCUYDgqgj9ngGrhtPVg9rHlEZeLH7k',
    'https://i.picsum.photos/id/366/600/600.jpg?hmac=d_io0RfMGZ1-ZlhYBuWyErHt_YKmF9yBEDVW4G4hMAU',
    'https://i.picsum.photos/id/290/600/600.jpg?hmac=JSTaaWp-CMyTVp6dLHMQKpo5wo_fykNlb585cCdpM0M',
    'https://i.picsum.photos/id/775/600/600.jpg?hmac=DPntMvoroqzWVK8etVabp36rNG1pN_bY_sDRvhpiOwc',
    'https://i.picsum.photos/id/894/600/600.jpg?hmac=wJg2bcsTpfgAb0eYMLFbhzwiEUMTMBwtBf-yvdY491k',
    'https://i.picsum.photos/id/1050/600/600.jpg?hmac=4njigak_Ut35oqpwIFsfqCgw146W6j913LM6C3IZdvg',
    'https://i.picsum.photos/id/1084/600/600.jpg?hmac=hRLCbJgDWMBWJARiuhOiPXONJD4WtLHiWMRmk9doPl8',
    'https://i.picsum.photos/id/1048/600/600.jpg?hmac=OV4CqmVsJQPQaFuGjP8J6OfcRNse3neaNocChV6yLUU',
    'https://i.picsum.photos/id/268/600/600.jpg?hmac=lnA4QfVs6bnaxFBQgMVs2Ot9ARF4fxURRVPw8M8tIfI',
    'https://i.picsum.photos/id/27/600/600.jpg?hmac=czdZMe0esxZo8fnoCtkxJd2snl8C6QF5uQcNR8rHWho'
]

def random_user_id():
    user_id = random.randint(1,22)
    return user_id

def random_description():
    description = fake.paragraph(nb_sentences=5, variable_nb_sentences=True)
    return description

def seed_posts():
    for i in range(100):
        newPost = Post(
            user_id=random_user_id(),
            description=random_description(),
            content=post_pictures[i]
        )
        db.session.add(newPost)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
