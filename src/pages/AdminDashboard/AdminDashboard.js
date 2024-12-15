import React from 'react';
import LogoHospital from '../../assets/LogoHospital.png';
import grafico1 from '../../assets/grafico1.png';
import grafico2 from '../../assets/grafico2.png';
import grafico3 from '../../assets/grafico3.png';
import grafico4 from '../../assets/grafico4.png';

import MenuAdmin from './MenuAdmin';

const AdminDashboard = () => {
    return (
        <div className="bg-[#f9faff] h-[1200px] relative ">
            <div className="sticky top-0 right-0">
                <MenuAdmin />
            </div>
            <div className="flex flex-col gap-[60px] items-center justify-center w-[1151px] absolute left-[289px] top-0 overflow-auto">
                <div className="pt-16 pb-8 flex flex-col gap-8 items-start justify-start self-stretch relative">
                    <div className="pr-8 pl-8 flex flex-col gap-2.5 items-start justify-start self-stretch relative">
                        <div className="flex flex-col gap-[22px] items-start justify-start self-stretch relative">
                            <div className="text-black text-left font-['Mulish-SemiBold',_sans-serif] text-2xl font-semibold relative flex items-center justify-start">
                                Bienvenido Jordy Navarrete
                            </div>
                            <div className="text-black text-left font-['Mulish-Light',_sans-serif] text-base font-light relative flex items-center justify-start">
                                Mira todas las actualizaciones y reportes estadisiticos medicos dispoinbles
                            </div>
                        </div>
                    </div>
                    <div className="pr-8 pl-8 flex flex-row gap-8 items-end justify-center shrink-0 w-[1151px] relative">
                        <div className="self-stretch flex-1 static">
                            <div className="bg-white rounded-3xl p-8 flex flex-col gap-6 items-start justify-center w-[774.97px] h-[462px] absolute left-8 top-0">
                                <div className="text-[#0080c8] text-left font-['Mulish-Bold',_sans-serif] text-base leading-[19.58px] font-bold relative w-[213.37px]">
                                    Casos reportados por covid
                                </div>
                                <div className="flex flex-row items-center justify-between self-stretch relative">
                                    <div className="shrink-0 w-[155.22px] h-5 static">
                                        <div className="w-[75px] h-5 static">
                                            <div className="flex flex-row gap-3.5 items-center justify-start absolute left-0 top-1.5">
                                                <div className="bg-[#7d1cfb] rounded-full shrink-0 w-2 h-2 relative"></div>
                                                <div className="text-neutral-colors-black text-left font-['Mulish-Medium',_sans-serif] text-sm leading-5 font-medium relative">
                                                    Hombre
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[59px] h-5 static">
                                            <div className="flex flex-row gap-3.5 items-center justify-start absolute left-[96.22px] top-1.5">
                                                <div className="bg-[#a672eb] rounded-full shrink-0 w-2 h-2 relative"></div>
                                                <div className="text-neutral-colors-black text-left font-['Mulish-Medium',_sans-serif] text-sm leading-5 font-medium relative">
                                                    Mujer
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#f8f8ff] rounded-lg p-2 flex flex-row gap-6 items-center justify-center shrink-0 relative">
                                        <div className="text-neutral-colors-400 text-center font-['Inter-Regular',_sans-serif] text-xs leading-[11.19px] font-normal relative w-[30.65px]">
                                            Dia
                                        </div>
                                        <div className="text-neutral-colors-400 text-center font-['Inter-Regular',_sans-serif] text-xs leading-[11.19px] font-normal relative">
                                            Semana
                                        </div>
                                        <div className="bg-[#1e1b39] rounded-lg p-2 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative">
                                            <div className="text-white text-center font-['Inter-Medium',_sans-serif] text-xs leading-[11.19px] font-medium relative w-[43.97px]">
                                                Año
                                            </div>
                                        </div>
                                        <div className="text-neutral-colors-400 text-center font-['Inter-Regular',_sans-serif] text-xs leading-[11.19px] font-normal relative w-[33.31px]">
                                            Mes
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink-0 w-[711px] h-[257.95px] static">
                                    <div className="w-[711px] h-[257.95px] static">
                                        <div className="flex flex-row gap-2 items-start justify-start flex-wrap w-[711px] h-[257.95px] absolute left-8 top-[152.03px]">
                                            <div className="shrink-0 w-3.5 h-[209.79px] static">
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-0 top-[194.71px] w-[7px] h-[15.08px]">
                                                    0
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-0 top-[146.03px] w-3 h-[30.16px]">
                                                    1k
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-0 top-[97.35px] w-[13px] h-[30.16px]">
                                                    2k
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-0 top-[48.68px] w-3.5 h-[30.16px]">
                                                    3k
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-0 top-0 w-3.5 h-[30.16px]">
                                                    4k
                                                </div>
                                            </div>
                                            <div className="shrink-0 w-[711px] h-[30.16px] static">
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-0 top-[227.79px] w-[29.9px] h-[30.16px]">
                                                    1 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[77.96px] top-[227.79px] w-[32.03px] h-[30.16px]">
                                                    3 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[158.17px] top-[227.79px] w-[30.96px] h-[30.16px]">
                                                    7 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[237.62px] top-[227.79px] w-[37.37px] h-[30.16px]">
                                                    10 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[323.05px] top-[227.79px] w-[37.37px] h-[30.16px]">
                                                    14 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[409.23px] top-[227.79px] w-[38.44px] h-[30.16px]">
                                                    20 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[496.9px] top-[227.79px] w-[38.44px] h-[30.16px]">
                                                    23 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[584.57px] top-[227.79px] w-[38.44px] h-[30.16px]">
                                                    27 Oct
                                                </div>
                                                <div className="text-neutral-colors-text-gray text-left font-['Inter-Regular',_sans-serif] text-[11.189998626708984px] leading-[12.59px] font-normal absolute left-[671.49px] top-[227.79px] w-[39.51px] h-[30.16px]">
                                                    30 Oct
                                                </div>
                                            </div>
                                        </div>
                                        <img className="w-[684.33px] h-[189.6px] absolute left-[57.51px] top-[161.88px] overflow-visible" src={grafico1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[29.85px] items-start justify-start shrink-0 relative">
                            <div className="shrink-0 w-[280.03px] h-[462px] relative">
                                <div
                                    className="bg-white rounded-[10.98px] w-[280.03px] h-[462px] absolute left-0 top-0"

                                ></div>
                                <div className="w-[193.91px] h-[111.54px] static">
                                    <div className="w-[193.91px] h-4 static">
                                        <div
                                            className="text-neutral-colors-400 text-right font-['Inter-Regular',_sans-serif] text-[9.88343620300293px] leading-[10.98px] font-normal absolute left-[219.46px] top-[322.29px]"
                                        >
                                            410
                                        </div>
                                        <div
                                            className="text-neutral-colors-text-gray text-left font-['Mulish-Medium',_sans-serif] text-sm leading-[15.37px] font-medium absolute left-[60.14px] top-[320.03px]"
                                        >
                                            Traumatología
                                        </div>
                                        <div
                                            className="bg-[#9bbcff] rounded-[13.18px] w-[7.81px] h-[7.81px] absolute left-[43.55px] top-[323.82px]"
                                        ></div>
                                    </div>
                                    <div className="w-[192.91px] h-4 static">
                                        <div
                                            className="text-neutral-colors-400 text-right font-['Inter-Regular',_sans-serif] text-[9.88343620300293px] leading-[10.98px] font-normal absolute left-[219.46px] top-[352.98px]"
                                        >
                                            142
                                        </div>
                                        <div
                                            className="text-neutral-colors-text-gray text-left font-['Mulish-Medium',_sans-serif] text-sm leading-[15.37px] font-medium absolute left-[60.14px] top-[351.88px]"
                                        >
                                            Pediatría
                                        </div>
                                        <div
                                            className="bg-[#f4b0b0] rounded-[7.69px] w-[7.81px] h-[7.81px] absolute left-[43.55px] top-[355.67px]"
                                        ></div>
                                    </div>
                                    <div className="w-[192.71px] h-4 static">
                                        <div
                                            className="text-neutral-colors-400 text-right font-['Inter-Regular',_sans-serif] text-[9.88343620300293px] leading-[10.98px] font-normal absolute left-[217.26px] top-[386.47px]"
                                        >
                                            340
                                        </div>
                                        <div
                                            className="text-neutral-colors-text-gray text-left font-['Mulish-Medium',_sans-serif] text-sm leading-[15.37px] font-medium absolute left-[60.14px] top-[383.73px]"
                                        >
                                            Medicina general
                                        </div>
                                        <div
                                            className="bg-[#7d1cfb]  rounded-[13.18px] w-[7.81px] h-[7.81px] absolute left-[43.55px] top-[387.51px]"
                                        ></div>
                                    </div>
                                    <div className="w-[193.26px] h-4 static">
                                        <div
                                            className="text-neutral-colors-400 text-right font-['Inter-Regular',_sans-serif] text-[9.88343620300293px] leading-[10.98px] font-normal absolute left-[217.81px] top-[418.32px]"
                                        >
                                            590
                                        </div>
                                        <div
                                            className="text-neutral-colors-text-gray text-left font-['Mulish-Bold',_sans-serif] text-[13px] leading-[15.37px] font-bold absolute left-[60.14px] top-[415.57px]"
                                        >
                                            Fisiatría
                                        </div>
                                        <div
                                            className="bg-[#4a3aff] rounded-[7.69px] w-[7.81px] h-[7.81px] absolute left-[43.55px] top-[419.36px]"
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2.5 items-center justify-center w-[262px] absolute left-[18.03px] top-[30.67px]">
                                    <div className="text-[#0080c8] text-left font-['Mulish-Bold',_sans-serif] text-base leading-[15.37px] font-bold relative">
                                        Asistencia por especialidad
                                    </div>
                                </div>
                                <div className="flex flex-row gap-[10.95px] items-start justify-start absolute left-[27.06px] top-[67px]">
                                    <img
                                        className="shrink-0 w-[225.53px] h-[243px] relative object-cover"
                                        src={grafico2}
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="pr-8 pl-8 flex flex-row gap-8 items-start justify-start self-stretch relative">
                        <div className="bg-white rounded-3xl p-8 flex flex-col gap-2.5 items-start justify-start self-stretch flex-1 relative max-w-lg">
                            <div className="flex flex-col gap-[29px] items-end justify-start self-stretch shrink-0 relative">
                                <div className="flex flex-row items-end justify-between self-stretch shrink-0 relative">
                                    <div className="flex flex-col gap-3 items-start justify-start shrink-0 w-[259.2px] relative">
                                        <div className="shrink-0  h-7 static">
                                            <div className="text-[#0080c8] text-left font-['Mulish-Bold',_sans-serif] text-base leading-7 font-bold absolute left-0 top-0">
                                                Pacientes por provincia y género
                                            </div>
                                        </div>
                                        <div className="shrink-0 w-[155.22px] h-5 static">
                                            <div className="w-[75px] h-5 static">
                                                <div className="flex flex-row gap-3.5 items-center justify-start absolute left-0 top-10">
                                                    <div className="bg-[#7d1cfb] rounded-full shrink-0 w-2 h-2 relative"></div>
                                                    <div className="text-neutral-colors-black text-left font-['Mulish-Medium',_sans-serif] text-sm leading-5 font-medium relative">
                                                        Hombre
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-[59px] h-5 static">
                                                <div className="flex flex-row gap-3.5 items-center justify-start absolute left-[96.22px] top-10">
                                                    <div className="bg-[#a672eb] rounded-full shrink-0 w-2 h-2 relative"></div>
                                                    <div className="text-neutral-colors-black text-left font-['Mulish-Medium',_sans-serif] text-sm leading-5 font-medium relative">
                                                        Mujer
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink-0 w-[74px] h-[52px] static">
                                        <div className="text-neutral-colors-black text-right font-bold text-headings-h4-font-size leading-headings-h4-line-height absolute right-0 top-8">
                                            31,863
                                        </div>

                                        <div className="text-neutral-colors-text-gray text-right font-['Mulish-Regular',_sans-serif] text-base leading-5 font-normal absolute left-[426.5px] top-2">
                                            Total
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-neutral-colors-500 self-stretch shrink-0 h-0 relative"></div>
                                <div className="flex-1 w-full relative">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={grafico4}
                                        alt="Gráfico"
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="bg-white rounded-3xl p-8 flex flex-col gap-6 items-start justify-start flex-1 relative">
                            <div className="flex flex-col gap-8 items-start justify-start self-stretch shrink-0 relative">
                                <div className="flex flex-col gap-[11px] items-start justify-start shrink-0 relative">
                                    <div className="text-[#0080c8] text-left font-['Mulish-Bold',_sans-serif] text-base leading-7 font-bold relative w-[236px]">
                                        Enfermedades más comunes
                                    </div>
                                    <div className="bg-[#f8f8ff] rounded-lg pt-0.5 pr-2 pb-0.5 pl-2 flex flex-row gap-6 items-center justify-center shrink-0 relative">
                                        <div className="text-neutral-colors-400 text-center font-['Inter-Regular',_sans-serif] text-xs leading-[11.19px] font-normal relative">
                                            Mes
                                        </div>
                                        <div className="bg-[#1e1b39] rounded-lg pt-2 pr-3 pb-2 pl-3 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative">
                                            <div className="text-white text-center font-['Inter-Medium',_sans-serif] text-xs leading-[11.19px] font-medium relative w-[43.97px]">
                                                Año
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="shrink-0 w-[463.5px] h-[295.23px] relative object-cover"
                                    src={grafico3}
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminDashboard;
