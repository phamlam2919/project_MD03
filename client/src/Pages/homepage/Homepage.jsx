import React from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import "./homepage.css";
import NewShoes from "../../Commons/NewSHOES/NewShoes";
import NewBag from "../../Commons/NewBAG/NewBag";
import NewBalo from "../../Commons/NewBALO/NewBalo";
function Homepage() {
    return (
        <div>
            <Header />
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            style={{ width: "100%" }}
                            src="https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/slider_5.jpg?1693214259155"
                            alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ width: "100%" }}
                            src="https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/slider_1.jpg?1693214259155"
                            alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ width: "100%" }}
                            src="https://bizweb.dktcdn.net/100/446/974/themes/849897/assets/slider_2.jpg?1693214259155"
                            alt=""
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div style={{ padding: "3% 7%" }}>
                <div className="section_service">
                    <div>
                        <img
                            width="44"
                            height="35"
                            className="lazy loaded"
                            src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_1.svg?1693214259155"
                            data-src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_1.svg?1693214259155"
                            alt="Giao hàng toàn quốc"
                            data-was-processed="true"
                        />
                        <h4>Giao hàng toàn quốc</h4>
                        <p>
                            Miễn phí vận chuyển với các đơn hàng trị giá trên
                            1.000.000Đ
                        </p>
                    </div>
                    <div>
                        <img
                            width="44"
                            height="35"
                            className="lazy loaded"
                            src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_2.svg?1693214259155"
                            data-src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_2.svg?1693214259155"
                            alt="Hỗ trợ online"
                            data-was-processed="true"
                        />
                        <h4>Hỗ trợ online</h4>
                        <p>
                            Đội ngũ hỗ trợ hoạt động tất cả các ngày trong tuần,
                            từ 9am--9pm
                        </p>
                    </div>
                    <div>
                        <img
                            width="44"
                            height="35"
                            className="lazy loaded"
                            src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_3.svg?1693214259155"
                            data-src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_3.svg?1693214259155"
                            alt="Đỗi hàng dễ dàng"
                            data-was-processed="true"
                        />
                        <h4>Đỗi hàng dễ dàng</h4>
                        <p>Đổi hàng online đơn giản, trực tiếp</p>
                    </div>
                    <div>
                        <img
                            width="44"
                            height="35"
                            className="lazy loaded"
                            src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_4.svg?1693214259155"
                            data-src="//bizweb.dktcdn.net/100/446/974/themes/849897/assets/icon_service_4.svg?1693214259155"
                            alt="Quà tặng hấp dẫn"
                            data-was-processed="true"
                        />
                        <h4>Quà tặng hấp dẫn</h4>
                        <p>
                            Chương trình khuyễn mãi cực lớn và hấp dẫn hàng
                            tháng
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <NewShoes />
                <NewBag />
                <NewBalo />
            </div>
            <Footer />
        </div>
    );
}

export default Homepage;
