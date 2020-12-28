import Link from 'next/link'

interface ListProps {
	title: string
}

const Header = (props: ListProps) => {
	return(
		<header>
		<h3>{props.title}</h3>
		<h4 className='home-link' >
			<Link href='/'>
				<a>Home</a>
			</Link>
		</h4>
		</header>
	)
}

export default Header