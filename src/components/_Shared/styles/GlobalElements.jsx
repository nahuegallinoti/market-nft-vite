import styled from 'styled-components';

export const DivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: ${props => props.alignItems || 'center'};
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  color: white;
  font-size: 1.2rem;
  align-items: baseline;
`;

export const ListContainer = styled.ul`
  margin-top: 5rem;
  display: flex;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'column'};
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
`;

export const ButtonNFT = styled.button`
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : 'black'};
  align-items: baseline;
`;

export const Image = styled.img`
  src: ${props => props.src};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  object-fit: 'cover';
  margin-bottom: 2vh;
`;
