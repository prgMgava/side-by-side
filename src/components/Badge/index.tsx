import { Flex, Text, Image, Tooltip } from "@chakra-ui/react";
import { allBadges } from "../../utils/Badges/badgesData";
import { allBadgesGray } from "../../utils/Badges/badgesDataGray";

interface IBadgeProps {
  badgeKey: string;
  badgeValue: boolean;
}

export const Badge = ({ badgeKey, badgeValue: achieved }: IBadgeProps) => {
  const badgeData = allBadges[badgeKey];
  const badgeDataGray = allBadgesGray[badgeKey];

  return (
    <Tooltip hasArrow label={badgeData.txt}>
      <Flex
        flexDirection="column"
        w={["30%", "30%", "25%", "20%", "15%"]}
        mb={{ base: "30px" }}
        alignItems="center"
      >
        <Text fontSize="0.8rem" fontWeight="bold">
          {badgeData.title}
        </Text>
        <Image
          w={achieved ? "auto" : { base: "55px", lg: "70px" }}
          h={{ base: "60px", lg: "65px" }}
          src={achieved ? badgeData.img : badgeDataGray.img}
        />
      </Flex>
    </Tooltip>
  );
};
