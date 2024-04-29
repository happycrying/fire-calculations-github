import React from 'react';
import { useNavigate } from "react-router";
import { BiRightArrow } from "react-icons/bi";

const About = () => {
  const navigate = useNavigate()
  return (
    <div className={'w-[90%] sm:w-[80%] self-center'}>
      <div className=' text-xl w-full pt-8 pl-8 pb-6 self-center items-center flex flex-col'>
        <div className={'w-fit bg-[#F5F5F5] p-5 pb-10 shadow-[0_7px_20px_0px_#00000026] mb-2 cursor-pointer rounded-xl'} onClick={() => navigate('/category')}>
          <h2 className={'font-[800] text-2xl mb-5 flex gap-3 items-center'}>Výpočet třídy a kategorii budovy <BiRightArrow/></h2>
          <p>
            Tento web poskytuje klíčové nástroje pro výpočty požární bezpečnosti. Naše platforma
            umožňuje rychle a snadno spočítat třídu a kategorii budovy podle platných požárních
            předpisů. Pomocí našich interaktivních formulářů můžete zadat potřebné informace o
            budově a okamžitě získat přesné výsledky, které vám pomohou lépe porozumět její požární
            rizikovosti.
          </p>
        </div>
        <div className={'w-fit bg-[#F5F5F5] p-5 pb-10 shadow-[0_7px_20px_0px_#00000026] mb-2 cursor-pointer rounded-xl'}  onClick={() => navigate('/pnp')}>
          <h2 className={'font-[600] text-2xl mb-5 flex gap-3 items-center'}>
            Výpočet požárně nebezpečného prostoru otvorů <BiRightArrow/>
          </h2>
          <p>
            Další klíčovou funkcí naší stránky je schopnost vypočítat požárně nebezpečné prostory
            otvorů v budově. Na základě vašich vstupních údajů provedeme analýzu a identifikujeme
            otvory s potenciálně zvýšeným rizikem požáru. Tato informace je zásadní pro navrhování
            účinných požárních opatření a minimalizaci nebezpečí.
          </p>
        </div>

        <div className={'w-fit bg-[#F5F5F5] p-5 pb-10 shadow-[0_7px_20px_0px_#00000026] mb-2 rounded-xl'}>
          <h2 className={'font-[600] text-2xl mb-5'}>Export výsledků</h2>
          <p>
            Kromě toho umožňujeme exportovat výsledky výpočtů do formátu PDF. Tímto způsobem můžete
            snadno sdílet a archivovat vaše výsledky a analýzy s kolegy nebo klienty. Získáte tak
            kompaktní a profesionální dokument obsahující veškeré potřebné informace.
          </p>
        </div>
        <div className={'w-fit bg-[#F5F5F5] p-5 pb-10 shadow-[0_7px_20px_0px_#00000026] mb-2 rounded-xl'}>
          <h2 className={'font-[600] text-2xl mb-5'}>Pohodlnost</h2>
          <p>
            Naše webové prostředí je navrženo tak, aby vám usnadnilo práci s výpočty požární
            bezpečnosti a abyste mohli efektivně a přesně plánovat opatření pro ochranu budov a osob.
            Vyzkoušejte naše nástroje ještě dnes a získejte důvěru ve vaše požární strategie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;