import UpdateItem from '../components/UpdateItem';

// eslint-disable-next-line react/prop-types
const Update = props => (
  <div>
    <UpdateItem id={props.query.id} />
  </div>
);

export default Update;
